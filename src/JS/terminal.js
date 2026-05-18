// Commands to be used
const commands = {
    hello: function(what) {
        this.echo('hello ' + what + ' welcome to this website');
    },

    help: function(){
        this.echo("These are the aviliable commands");
    }


};


// ASCII art for logo
const greetings =
 `
 ____ ____ ____ ____ _________ ____ ____ ____ ____ 
||N |||u |||l |||l |||       |||T |||y |||p |||e ||
||__|||__|||__|||__|||_______|||__|||__|||__|||__||
|/__\\|/__\\|/__\\|/__\\|/_______\\|/__\\|/__\\|/__\\|/__\\|

 `

const term = $('body').terminal(commands, {
    greetings
});


//Figlet
const font = 'Slant';
figlet.defaults({fontpath: 'https://unpkg.com/figlet/fonts/'});
figlet.preloadFonts([font], ready);



function ready(){
    term.echo(() => {
        const ascii = render('Terminal site');
        return '${ascii}\nWelcome to Null Type\n';
    });
}

function render(text){
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        widths: cols,
        whitespaceBreak: true
    }));
}

function trim(str){
    return str.replace(/[\n\s]+$/, '')
}

