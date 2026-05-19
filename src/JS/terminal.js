//---------------------------- Config --------------------------------------//
// These are settings that can be changed by the user
const settings = {
    theme: 'default',
    words: 50,
    timeLimit: 0,
    language: 'javascript'
};

const THEMES = ['default', 'dark', 'dracula', 'monokai'];
//------------------------------------------------------------------------//


//--------------------------- COMMAND LOGIC ------------------------------//
const commands = {
    help: function() {
        const helpText = [
            'Available commands:',
            'help               - Show commands available',
            'start              - Begin Typing',
            'mode <mode>        - Change content type (Algorithms, text, docs)',
            'language <l>       - Set language: javascript, python, sql, or words (plain text)',
            'words <int>        - Change how many words are displayed',
            'time <int>         - Set time limit in seconds (0 = Endless)',
            'stats              - Show last typing stats',
            'theme <name>       - Change theme, default, dark, dracula, monokai',
            'clear              - Clear terminal',
        ];
        helpText.forEach(line => this.echo(line));
    },

    theme: function(name) {
        if (!name) {
            this.echo(`Usage: theme <name>`);
            this.echo(`Themes: ${THEMES.join(', ')}`);
            return;
        }
        if (!THEMES.includes(name.toLowerCase())) {
            this.echo(`Unknown theme. Use: ${THEMES.join(', ')}`);
            return;
        }
        settings.theme = name.toLowerCase();
        this.echo(`✓ Theme changed to: ${name}`);
    },

    words: function(count) {
        const wordCount = parseInt(count);
        if (!wordCount || wordCount < 10) {
            this.echo('Word count must be greater than 10');
            return;
        }
        settings.words = wordCount;
        this.echo(`✓ Text length set to: ${wordCount} words`);
    },

    time: function(seconds) {
        const time = parseInt(seconds, 10);
        if (isNaN(time) || time < 0) {
            this.echo('Time must be 0 (endless) or positive seconds');
            return;
        }
        if (time > 0 && (time < 30 || time > 600)) {
            this.echo('Time limit must be 30–600 seconds, or 0 for endless');
            return;
        }
        settings.timeLimit = time;
        this.echo(time === 0 ? '✓ Time limit: endless' : `✓ Time limit set to: ${time} seconds`);
    },

    language: function(lang) {
        if (!lang) {
            this.echo('Usage: language <name>');
            return;
        }
        settings.language = lang.toLowerCase();
        this.echo(`✓ Language set to: ${settings.language}`);
    },

    clear: function() {
        this.clear();
    }
};
//--------------------------------------------------------//


//------------------- ASCII LOGO -------------------//
// ASCII art for logo
const greetings =
 `
 ____ ____ ____ ____ _________ ____ ____ ____ ____ 
||N |||u |||l |||l |||       |||T |||y |||p |||e ||
||__|||__|||__|||__|||_______|||__|||__|||__|||__||
|/__\\|/__\\|/__\\|/__\\|/_______\\|/__\\|/__\\|/__\\|/__\\|

 `
//---------------------------------------------------//


//-------------- FIGLET SETUP ------------------------------//
const term = $('body').terminal(commands, {
    greetings
});

const font = 'Slant';

figlet.defaults({fontpath: 'https://unpkg.com/figlet/fonts/'});
figlet.preloadFonts([font], ready);
//--------------------------------------------------------------//


//-------------------- Helper Functions -------------------------------//

/**
 * Called when figlet fonts finish loading
 * Displays the welcome message with ASCII art using the figlet library
 */
function ready(){
    term.echo(() => {
        const ascii = render('Terminal site');
        return '${ascii}\nWelcome to Null Type\n';
    });
}


/**
 * Converts plain text into ASCII art using the Figlet library
 * @param {string} text - The text to convert to ASCII art
 * @returns {string} The ASCII art representation of the text
 */
function render(text){
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        widths: cols,
        whitespaceBreak: true
    }));
}


/**
 * Removes trailing whitespace and newlines from a string
 * Used to clean up ASCII art output so it displays properly
 * @param {string} str - The string to trim
 * @returns {string} The trimmed string
 */
function trim(str){
    return str.replace(/[\n\s]+$/, '')
}
//-----------------------------------------------------------//
