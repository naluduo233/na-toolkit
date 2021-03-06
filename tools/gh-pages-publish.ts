const { cd, exec, echo, touch } = require("shelljs")
const { readFileSync } = require("fs")
const url = require("url")

let repoUrl
let pkg = JSON.parse(readFileSync("package.json") as any)
if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section")
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

let parsedUrl = url.parse(repoUrl)
let repository = (parsedUrl.host || "") + (parsedUrl.path || "")
// let ghToken = process.env.ACCESS_TOKEN

echo("Deploying docs!!!")
cd("docs")
touch(".nojekyll")
exec("git init")
exec("git add .")
exec('git config user.name "naluduo233"')
exec('git config user.email "jecyu.lin@gmail.com"')
exec('git commit -m "docs(docs): update gh-pages"')
// exec(
//   `git push --force --quiet "https://${ghToken}@${repository}" main:gh-pages`
// )
exec(
  `git push origin -f main:gh-pages`
)
echo("Docs deployed!!")
