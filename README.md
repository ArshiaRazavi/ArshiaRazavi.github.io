# arshiarazavi.github.io

Personal academic site of Arshia Razavi, M.Sc. student in Physics at the
University of Calgary. Live at <https://arshiarazavi.github.io>.

The site is built with [Jekyll](https://jekyllrb.com) and published by
GitHub Pages, which builds it directly from this repository.

## Running locally

Requires Ruby (with development headers) and Bundler.

- **macOS:** install Ruby via Homebrew (`brew install ruby`) and put the
  Homebrew Ruby on your `PATH`, then `gem install bundler`.
- **Linux / WSL:** `sudo apt install ruby-dev ruby-bundler nodejs`. Some
  distributions also need `sudo apt install build-essential gcc make` to
  compile native gems.

Then, from the repository root:

```bash
bundle install
bundle exec jekyll serve --livereload
```

The site is served at <http://localhost:4000> and rebuilds on save.
Changes to `_config.yml` need a server restart.

The `Gemfile` pins the `github-pages` gem so local builds match what
GitHub Pages runs. `Gemfile.lock` is gitignored, so `bundle install`
resolves fresh versions on each machine.

## Where content lives

| Content                          | Location                                             |
|----------------------------------|------------------------------------------------------|
| Homepage                         | `_pages/about.md`                                    |
| CV page and PDF                  | `_pages/cv.md`, `pdfs/`                              |
| Blog posts                       | `_posts/`                                            |
| Navigation menu                  | `_data/navigation.yml`                               |
| Site settings and author sidebar | `_config.yml`                                        |
| Styles                           | `_sass/`, `assets/css/main.scss`                     |
| Images                           | `images/`                                            |
| Collections                      | `_publications/`, `_talks/`, `_teaching/`, `_portfolio/` |

## Credits and license

Built on [AcademicPages](https://github.com/academicpages/academicpages.github.io),
a fork of the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes)
Jekyll theme by Michael Rose. The theme code is released under the MIT
License; see [`LICENSE`](LICENSE).
