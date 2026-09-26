# Import standalone reveal.js decks into the Hugo slide library.
#
#     julia tools/import_deck.jl OUTDIR TAG=path/to/deck.html [TAG=deck.html ...]
#
# Each <section> becomes one file in OUTDIR/content/slides/, with the chrome the
# theme now draws (the section wrapper, the slide canvas, the heading, the slide
# number, the corner citation, the PART kicker, the speaker notes) lifted into
# TOML front matter and only the body left as HTML. Slides that are the same in
# several decks become one file. A slide whose body differs from deck to deck
# keeps one file per variant, the extra ones named for the deck they came from.
# Each deck gets a talk definition, OUTDIR/content/TAG/_index.md, listing its
# slides in order; fill in its front matter by hand afterwards.
#
# This is how the decks in this repository were brought over, and it will do the
# same for a deck exported from the design tool. Standard library only.

using TOML

struct Slide
    deck::String
    title::String          # from data-label, "N · Title"
    heading::String        # the <h1>, empty for none
    heading_size::Int      # 0 for the theme default
    dark::Bool
    number::Bool           # had a slide number
    part::Bool             # a part divider, its PART kicker numbered by the theme
    cite::String           # the corner citation, empty for none
    notes::String
    body::String
end

const H1_INLINE = r"[ \t]*<h1\s+style=\"position:absolute;left:48px;top:-8px;height:96px;margin:0;display:flex;align-items:center;white-space:nowrap;font-size:(\d+)px;font-weight:400;line-height:1;text-shadow:2px 2px 3px rgb\(0 42 84 / \.40\)\">\s*(.*?)\s*</h1>\n?"s
const H1_CLASS = r"[ \t]*<h1 class=\"slide-h1\"(?: style=\"font-size:(\d+)px\")?>\s*(.*?)\s*</h1>\n?"s
const NUM = r"[ \t]*<div class=\"ds-slide-num\">\d+</div>\n?"
const CITE = r"[ \t]*<div class=\"ds-cite\">\s*(.*?)\s*</div>\n?"s
const PART = r"(<div style=\"font-size:29px;letter-spacing:3px;opacity:\.85;font-weight:700\">)PART [A-Z]+\s*</div>"
const NOTES = r"\s*<aside class=\"notes\">\s*(.*?)\s*</aside>"s
const DEFAULT_HEADING = 53

function dedent(s)
    lines = split(s, '\n')
    ind = minimum((length(l) - length(lstrip(l)) for l in lines if !isempty(strip(l))); init=typemax(Int))
    ind == typemax(Int) && (ind = 0)
    join((isempty(strip(l)) ? "" : l[ind+1:end] for l in lines), '\n')
end

# Collapse blank-line runs and trailing space, so a stray edit does not split a slide.
tidy(s) = strip(replace(s, r"[ \t]+\n" => "\n", r"\n{3,}" => "\n\n"))
squash(s) = replace(s, r"\s+" => " ")

function parse_deck(tag, path)
    html = read(path, String)
    slides = Slide[]
    for (i, m) in enumerate(eachmatch(r"<section\b([^>]*)>(.*?)</section>"s, html))
        attrs, inner = m.captures
        occursin("<section", inner) && error("$path: nested <section> in slide $i")
        label = match(r"data-label=\"\d+ · ([^\"]*)\"", attrs)[1]
        dark = occursin("data-background-color=\"#002A54\"", attrs)

        notes = ""
        nm = match(NOTES, inner)
        if nm !== nothing
            notes = String(nm[1])
            inner = replace(inner, NOTES => "")
        end
        inner = strip(inner)
        startswith(inner, "<div class=\"slide-canvas\">") && endswith(inner, "</div>") ||
            error("$path: slide $i has no slide canvas")
        inner = inner[length("<div class=\"slide-canvas\">")+1:end-length("</div>")]

        heading, size = "", 0
        for re in (H1_INLINE, H1_CLASS)
            hm = match(re, inner)
            hm === nothing && continue
            size = hm[1] === nothing ? DEFAULT_HEADING : parse(Int, hm[1])
            heading = hm[2]
            inner = replace(inner, re => ""; count=1)
            break
        end
        size == DEFAULT_HEADING && (size = 0)
        heading = squash(heading)

        number = occursin(NUM, inner)
        inner = replace(inner, NUM => "")
        cite = ""
        cm = match(CITE, inner)
        if cm !== nothing
            cite = squash(cm[1])
            inner = replace(inner, CITE => ""; count=1)
        end
        part = occursin(PART, inner)
        inner = replace(inner, PART => s"\1<!--part--></div>")
        # Assets are published at the site root; relativeURLs makes them relative again.
        inner = replace(inner, "src=\"../assets/" => "src=\"/assets/", "href=\"../assets/" => "href=\"/assets/",
                        "src=\"assets/" => "src=\"/assets/", "href=\"assets/" => "href=\"/assets/")
        body = tidy(dedent(inner))
        push!(slides, Slide(tag, label, heading, size, dark, number, part, cite, strip(notes), body))
    end
    slides
end

key(s::Slide) = (s.heading, s.heading_size, s.dark, s.number, squash(s.notes), squash(s.body))

function slug(s)
    s = lowercase(s)
    s = replace(s, r"<[^>]*>" => "", "&amp;" => "and", r"&[a-z]+;" => "-", "–" => "-", "'" => "")
    s = replace(s, r"[^a-z0-9]+" => "-")
    strip(s, '-')
end

tomlstr(s) = "\"" * replace(s, "\\" => "\\\\", "\"" => "\\\"") * "\""

function slide_file(s::Slide)
    io = IOBuffer()
    println(io, "+++")
    println(io, "title = ", tomlstr(s.title))
    isempty(s.heading) || println(io, "heading = ", tomlstr(s.heading))
    s.heading_size == 0 || println(io, "heading_size = ", s.heading_size)
    s.dark && println(io, "dark = true")
    s.part && println(io, "part = true")
    s.number || println(io, "number = false")
    isempty(s.cite) || println(io, "cite = ", tomlstr(s.cite))
    if !isempty(s.notes)
        occursin("'''", s.notes) && error("notes contain '''")
        println(io, "notes = '''\n", s.notes, "\n'''")
    end
    println(io, "+++")
    println(io, s.body)
    String(take!(io))
end

# The library as it stands: each file is a group of one, keeping its name.
function load_library(lib)
    slides = Pair{String,Slide}[]
    isdir(lib) || return slides
    for f in sort(readdir(lib))
        (endswith(f, ".html") && f != "_index.html") || continue
        m = match(r"^\+\+\+\n(.*?)\n\+\+\+\n(.*)$"s, read(joinpath(lib, f), String))
        m === nothing && error("$f: no TOML front matter")
        fm = TOML.parse(m[1])
        s = Slide("", get(fm, "title", ""), get(fm, "heading", ""), get(fm, "heading_size", 0),
                  get(fm, "dark", false), get(fm, "number", true), get(fm, "part", false),
                  get(fm, "cite", ""), strip(get(fm, "notes", "")), strip(m[2]))
        push!(slides, f[1:end-5] => s)
    end
    slides
end

function main(args)
    outdir = args[1]
    decks = [Pair(split(a, '='; limit=2)...) for a in args[2:end]]
    parsed = [parse_deck(String(t), String(p)) for (t, p) in decks]
    # A deck that never cites is shown with citations off, so its slides can share
    # a file with the cited version of the same slide.
    uncited = Set(t for ((t, _), deck) in zip(decks, parsed) if all(s -> isempty(s.cite), deck))

    lib = joinpath(outdir, "content", "slides")
    groups = Vector{Vector{Slide}}()
    names = Dict{Int,String}()
    for (n, s) in load_library(lib)
        push!(groups, [s])
        names[length(groups)] = n
    end
    known = length(groups)

    # Group identical slides: same key, and the same citation unless one side
    # comes from an uncited deck. Slides already in the library are matched too.
    groupof = Dict{Tuple{String,Int},Int}()     # (deck, position) => group
    for ((t, _), deck) in zip(decks, parsed), (i, s) in enumerate(deck)
        g = findfirst(groups) do grp
            key(grp[1]) == key(s) || return false
            c = something(findfirst(x -> !isempty(x.cite), grp), 0)
            gc = c == 0 ? "" : grp[c].cite
            gc == s.cite || (s.deck in uncited && isempty(s.cite)) ||
                (isempty(gc) && all(x -> x.deck in uncited, grp))
        end
        g === nothing && (push!(groups, Slide[]); g = length(groups))
        push!(groups[g], s)
        groupof[(t, i)] = g
    end
    # The cited member speaks for the group.
    rep(grp) = something(findfirst(x -> !isempty(x.cite), grp), 1) |> i -> grp[i]

    # Name each new group. The variant most decks share takes the plain slug,
    # unless the library already has it; the others are suffixed with the first
    # deck they appear in. A title slide or reference list, of which each deck
    # has its own, is named for its deck throughout.
    taken = Set(values(names))
    byslug = Dict{String,Vector{Int}}()
    for g in known+1:length(groups)
        push!(get!(byslug, slug(groups[g][1].title), Int[]), g)
    end
    for (sl, gs) in byslug
        sort!(gs; by=g -> (-length(groups[g]), g))
        for (j, g) in enumerate(gs)
            n = j == 1 && !(sl in ("title", "references")) && !(sl in taken) ? sl :
                sl * "--" * groups[g][1].deck
            n in taken && error("$n is taken; import under another tag")
            names[g] = n
            push!(taken, n)
        end
    end

    mkpath(lib)
    for g in known+1:length(groups)
        write(joinpath(lib, names[g] * ".html"), slide_file(rep(groups[g])))
    end
    for ((tag, path), deck) in zip(decks, parsed)
        dir = joinpath(outdir, "content", tag)
        mkpath(dir)
        title = match(r"<title>(.*?)(?: — [^<]*)?</title>"s, read(path, String))[1]
        open(joinpath(dir, "_index.md"), "w") do io
            println(io, "+++")
            println(io, "title = ", tomlstr(title))
            tag in uncited && println(io, "citations = false")
            println(io, "slides = [")
            for i in eachindex(deck)
                println(io, "  ", tomlstr(names[groupof[(tag, i)]]), ",")
            end
            println(io, "]")
            println(io, "+++")
        end
    end
    println("$(length(decks)) decks, $(sum(length, parsed)) slides, ",
            "$(length(groups) - known) new to the library of $known")
end

main(ARGS)
