/* github.com is a website and on git repo is a tool to maintain the source code
In main/master branch entire code is available 
github provide their own ci/cd pipeline in the form of github action
we can create our workflow yml file
when we push the code after that we can run the testcases
schedule the cron job on specific time , mail with the report, headless mode

no setup is required like jenkins everything is available
1.git init
is used to initialize a new Git repository in your project.
It creates a hidden .git folder, where Git stores all the version history, commits, branches, and configuration for that project.

intialize the project to the git
Initialized empty Git repository in /Users/ankita/Documents/Opencart_WebFramework_PW/.git/
Now Git starts tracking this project.

2.git remote add origin git@github.com:AnkitaSavvy/OpencartWebPwFramework.git 
make the connection with vs code to git repo so that whenever we push the code, it will reflect on this particular repository of git

3.git status
git status is used to check the current state of the Git repository. It shows the current branch, modified files, staged files, untracked files, 
and whether the working directory is clean or has pending changes.
It helps developers know what will be included in the next commit.
= gitignore file

git add
git add is used to move changes from the working directory to the staging area. 
In other words, it tells Git which changes you want to include in the next commit.
git add . → Stage all changes.
git add <file-name> → Stage only a specific file.
git add -A → Stage everything, including deleted files.
*/ 