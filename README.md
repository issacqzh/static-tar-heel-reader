# Static Tar Heel Reader

An experiment with a version of [Tar Heel Reader](https://tarheelreader.org)
that needs no logic on the server; simply serving files will be sufficient. I
fantasize that requiring very little maintenance will allow it to outlive me.

The script `generate.py` produces the pages in a hierarchy of directories. Each
book is assigned an ID using a fixed number of digits in the base you specify.
I'm thinking of using base 36 to avoid case sensitivity. The generated tree
looks like this for a tiny set of 200 books with base 16.

```
./
  index.html - a welcome page
  find.html  - search for books
  *.css      - style sheets
  *.js       - javascript generated from the typescript
  content/
    config.json - info the client code needs
    0/
      index.html - list of cover pages for books at this level
      0.html     - the html for book with id 00
      1.html
      ...
      0/
	0.jpg    - image 000
	1.jpg
	...
    1/ - same as above
    ...
    index/
      boy -- list of book ids that contain 'boy'. The content looks like:
        1A293648596E... -- boy is in 6 books each represented by 2 digits
      ...
```

I'm not convinced this layout is great; it is literally the first thing I
thought of. I like that the files are distributed through the tree so that no
level has too many files.

The index.html files are linked together so you can walk the collection starting
from the root. This should allow search engines and users without JavaScript
enabled to access the site.

I am assuming the IDs in these index files are in ascending order. Currently, I
have reviewed books first followed by unreviewed in order they were created.

## To Do

- Identify _stop_ words; we don't need to index 'the' for example.
- Come up with an ordering for the books based on popularity, quality, etc.
- Tell the user if a word is not in the index.
- Assign categories to more books.
- Filter books with spelling errors.
- Include [Collections](https://tarheelreader.org/collections/) so that even
  without JavaScript readers can have curated sets.



### Instructions (Han Guo)

1. Install `aspell` for the system. The command for Mac is: `brew install aspell`
2. Install Python dependencies. I built one myself: `pip install -r requirements.txt`
3. Install npm dependencies via `npm install`.
4. (Optional) Go to `data/`, run `python fetchBooks.py`. Feel free to change the number in `for page in trange(1, 10000):` in the file to save time. If you want to fetch all the images, do `wget -r --no-parent https://test.tarheelreader.org/`.
5. Compile all the files via `make`. Note that you might need to change the Shebang of `copypage.py` and `generate.py` if you are using virtualenv or have multiple versions of Python installed. An explanation of shebang is available at [here](https://bash.cyberciti.biz/guide/Shebang). An example change would be changing the shebang to `#!/usr/bin/env python`.
6. You might need to remove the `--public gb.cs.unc.edu` in `package.json`.
7. You are all set, do `npm run local` (or `nosw`, etc) and go to corresponding addresses.
