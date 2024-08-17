import os
from git import Repo, GitCommandError

# Define the path to your local Git repository
repo_path = '/Users/bimalchhetry/Documents/notepad/' #example path

# Initialize the repository object
repo = Repo(repo_path)
git = repo.git

try:
    git.pull()
    git.add('--all')
    commit_message = input("Enter your commit message: ")
    git.commit('-m', commit_message)
    git.push()

    print("Successfully pushed changes to GitHub.")

except GitCommandError as e:
    print("An error occurred while executing a Git command:", e)

    # Handle conflicts
    if "conflict" in str(e).lower():
        print("Merge conflict detected. Please resolve conflicts manually.")

    # Handle other errors as needed

except Exception as e:
    print("An unexpected error occurred:", e)
