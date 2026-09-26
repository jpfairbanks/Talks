module github.com/jpfairbanks/Talks

go 1.22

require github.com/jpfairbanks/Talks/themes/gatas-talks v0.0.0

// The theme is developed here; this site always builds with the copy beside it.
replace github.com/jpfairbanks/Talks/themes/gatas-talks => ./themes/gatas-talks
