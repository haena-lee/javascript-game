const cardsArray = [
    {
        'name': 'beagle',
        'image': './images/beagle.png'
    },
    {
        'name': 'chihuahua',
        'image': './images/chihuahua.png'
    },
    {
        'name': 'french-bulldog',
        'image': './images/french-bulldog.png'
    },
    {
        'name': 'golden-lab',
        'image': './images/golden-lab.png'
    },
    {
        'name': 'husky',
        'image': './images/husky.png'
    },
    {
        'name': 'jack-russell-terrier',
        'image': './images/jack-russell-terrier.png'
    },
    {
        'name': 'jindo',
        'image': './images/jindo.png'
    },
    {
        'name': 'shiba-inu',
        'image': './images/shiba-inu.png'
    }
]


const credits = document.getElementById('credits');
credits.addEventListener('mouseover', mouseOver);
credits.addEventListener('mouseout', mouseOut)
function mouseOver() {
    credits.style.color = 'lightblue';
    const $creditContent = $('.credit-content');
    $creditContent.addClass('show');
}
function mouseOut() {
    credits.style.color = 'white';
    const $creditContent = $('.credit-content');
    $creditContent.removeClass('show');
}

function makeGame() {
    const game = document.getElementById('game');
    const grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(grid);

    let gameGrid = cardsArray.concat(cardsArray);
    gameGrid.sort(() => 0.5 - Math.random());

    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${item.image})`;

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    })

    let count = 0;
    let previousTarget = null;
    let delay = 1200;

    let matchCount = 0;
    let clickCount = 0;

    grid.addEventListener('click', function(e){
        let clicked = e.target;
        if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) {return;}
        if (count < 2) {
            count++;
            clicked.classList.add('selected');
            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
                console.log(firstGuess);
                clicked.parentNode.classList.add('selected');
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                console.log(secondGuess);
                clicked.parentNode.classList.add('selected');
            }
            if (firstGuess !== '' && secondGuess !== '') {
                clickCount++;
                document.getElementById('clickCount').innerHTML = clickCount;
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                    setTimeout(resetGuesses, delay);
                    matchCount++;
                    document.getElementById('matches').innerHTML = matchCount;
                    console.log(`Number of matches: ${matchCount}`);
                    if (matchCount == (gameGrid.length / 2)) {
                        document.getElementById('youWin').innerHTML = "All the puppies found their moms!";
                        const $gameIntro = $('.game-intro');
                        $gameIntro.addClass('win');
                    }
                } else {
                    setTimeout(resetGuesses, delay);
                }
            }
            previousTarget = clicked;
        }
    });

    let firstGuess = '';
    let secondGuess = '';


    const match = () => {
        let selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('match');
        });
    }

    const resetGuesses = () => {
        firstGuess = '';
        secondGuess = '';
        count = 0;

        let selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
        });
    }
}
// Now instantiate the game:

function showGame() {
    var game = document.getElementById('game');
    if (game.style.display = 'none') {
        game.style.display = 'block';
    } else {
        game.style.dispaly = 'none';
    }
}

makeGame();

function resetGame() {
    matchCount = 0;
    document.getElementById("matches").innerHTML = matchCount;
    clickCount = 0;
    document.getElementById("clickCount").innerHTML = clickCount;
    $( "div" ).removeClass( "match" );
    var myGame = document.getElementById("game");
    myGame.innerHTML = '';

    // Create the whole game again
    makeGame();
}




