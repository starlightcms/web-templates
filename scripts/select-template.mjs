import { program } from 'commander'
import { select } from '@inquirer/prompts'
import { readdirSync } from 'fs'
import { exec } from 'child_process'
import chalk from 'chalk'


program
  .argument('<command...>')
  .action(async (command) => {
    const parsedCommand = command.join(' ')

    console.log(`${chalk.green('❯')} ${chalk.bold(`npm ${parsedCommand}`)}\n`)

    const templates = readdirSync(`${process.cwd()}/templates`, { withFileTypes: true })
      .filter(entry => entry.isDirectory()).map(entry => ({
        name: entry.name,
        value: entry.name
      }))

    const selected = await select({
      message: 'Select a template to run the command above:',
      choices: templates,
    })

    const npm = exec(`npm -w ${selected} ${parsedCommand}`)

    npm.stdout.pipe(process.stdout)
    npm.stderr.pipe(process.stderr)
  })

program.parse()
