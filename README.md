# cdegree
can be found live at: https://cdegree-bacbzqidfd.now.sh

## Getting Set up

`git clone https://github.com/corteggiano/cdegree.git` to clone the repository
`cd cdegree` to into your new local repo

## Branch Structure

The branch `master` is our source of truth, never push directly onto master without a very good reason and team approval.

### In order to add new features to this project follow these steps: 

`git checkout master` to go to our master branch

`git pull` to update your local master branch 

`git checkout -b branchNameHere` to create a new branch with a helpful branch name for your new feature

Do a bunch of work on your feature branch and then `git add` your changes, followed by a `git commit -m "commit message here"`. After you have commited your changes, do a `git push origin branchNameHere` in order to push your work to our remote repo

Once you have pushed all your changes to the remote repo, create a Pull Request and have a team member approve or request changes to your code. Once your PR is approved, you are free to squash merge into `master` and delete your feature branch.
