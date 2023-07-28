import { program } from 'commander'
import { select } from '@inquirer/prompts'
import { readFileSync } from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'

program
  .argument('<command...>')
  .action(async (command) => {
    const parsedCommand = command.join(' ')

    console.log(`${chalk.green('❯')} Running: ${chalk.bold(`npm ${parsedCommand}`)}`)

    const packageJson = JSON.parse(readFileSync(`${process.cwd()}/package.json`).toString())
    const templates = packageJson.workspaces.map((ws) => ({
      name: ws.replace('templates/', ''),
      value: ws,
    }))

    const selected = await select({
      message: 'Select a template to run the command:',
      choices: templates,
    })

    const npm = exec(`npm -w ${selected} ${parsedCommand}`)

    npm.stdout.pipe(process.stdout)
    npm.stderr.pipe(process.stderr)
  })

program.parse()
