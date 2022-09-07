window.onload = () =>{


    const asteroids = [];
    const bullets = [];
    let speedX= 0;
    let speedY= 0;
    let counter = 0;
    let asterspeedX = -4;
    let asterspeedY = 0;
    let bulletspeedX = 10;

    let ticker = PIXI.Ticker.shared;
    ticker.autoStart = false;
    ticker.stop();
    ticker.start();

    let app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 'red'
    })

    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850'
    });

    const score = new PIXI.Text('0', style);
    score.x = 10;
    score.y = 5;

    document.body.appendChild(app.view)

    const ship = PIXI.Sprite.from('ship.png')
    ship.scale.x = 0.05;
    ship.scale.y = 0.05;
    ship.position.y = 300;

    const gameContainer = new PIXI.Container();

    gameContainer.addChild(ship)
    app.stage.addChild(gameContainer)
    app.stage.addChild(score);



    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();
    createAsteroids();

    function createAsteroids(){
        const asteroid = PIXI.Sprite.from('asteroid.png');
        asteroids.push(asteroid);
        asteroid.width = 60;
        asteroid.height = 60;
        gameContainer.addChild(asteroid);
        const randomX = Math.random() * (app.screen.width - asteroid.width);
        const randomY = Math.random() * (app.screen.height - asteroid.height);
        asteroid.position.x = 900 + Math.floor(Math.random() * 900);
        asteroid.position.y = randomY;
        ticker.add(()=>{
            asteroid.position.x = asteroid.position.x + asterspeedX;
            asteroid.position.y = asteroid.position.y + asterspeedY;
        })

    }

    function createBullets(){
        const bullet = new PIXI.Sprite.from('asteroid.png');
        bullets.push(bullet);
        bullet.width = 50;
        bullet.height = 50;
        gameContainer.addChild(bullet);
        bullet.position.x = ship.position.x + 30 + bulletspeedX;
        bullet.position.y = ship.position.y;
        ticker.add(()=>{
            bullet.position.x = bullet.position.x + bulletspeedX;
            bullet.position.y = bullet.position.y;
        })
    }

    document.addEventListener('keyup', (e)=>{
        switch (e.keyCode){
            case 32: createBullets()
                break
        }
    })

    //bullet vs aster
    // ticker.add(()=>{
    //     bullets.forEach((bullet, i)=>{
    //         if(
    //             bullet.position.x + bullet.width > asteroid.position.x
    //             &&
    //             bullet.position.y + bullet.height > asteroid.position.y
    //             &&
    //             bullet.position.y < asteroid.position.y + asteroid.width
    //             &&
    //             bullet.position.x < asteroid.position.x + asteroid.height
    //         ){
    //             asteroids.splice(i, 1)
    //             bullet.splice(i, 1)
    //             gameContainer.removeChild(asteroid)
    //             gameContainer.removeChild(bullet)
    //             createAsteroids();
    //             createBullets();
    //             counter++;
    //         }
    //     })
    // })


    //score
    ticker.add(()=>{
        scoreingame()
    })

    function scoreingame(){
        score.text = counter;
    }

    //границі поля тіпа
    ticker.add(()=>{
        ship.position.x = ship.position.x + speedX;
        ship.position.y = ship.position.y + speedY;
        if(ship.position.y < 0){
            ship.position.y = 10;
        }
        if(ship.position.y > 540){
            ship.position.y = 530;
        }
        if(ship.position.x < 0){
            ship.position.x = 10;
        }
        if(ship.position.x > 770){
            ship.position.x = 740;
        }
    })

    //ремув після вихода за зону
    ticker.add(()=>{
        asteroids.forEach((asteroid, i)=>{
            if(asteroid.position.x < 0){
                asteroids.splice(i, 1)
                gameContainer.removeChild(asteroid)
                createAsteroids();
                counter++;
                console.log(counter)
            }
        })
    })

    //ship move it move it
    document.addEventListener('keydown', (e)=>{
    switch(e.keyCode){
        case 37: speedX = -5;
            break
        case 38: speedY = -5;
            break
        case 39: speedX = 5;
            break
        case 40: speedY = 5;
            break
    }
    })

    document.addEventListener('keyup', (e)=>{
    switch(e.keyCode){
        case 37: speedX = 0;
            break
        case 38: speedY = 0;
            break
        case 39: speedX = 0;
            break
        case 40: speedY = 0;
            break
    }
    })

    ticker.add(()=>{
        asteroids.forEach((asteroid, i)=>{
            if(
                ship.position.x + ship.width > asteroid.position.x
                &&
                ship.position.y + ship.height > asteroid.position.y
                &&
                ship.position.y < asteroid.position.y + asteroid.width
                &&
                ship.position.x < asteroid.position.x + asteroid.height
            ){
                    alert("GAME OVER")
                    document.location.reload();
                    clearInterval(interval); // Needed for Chrome to end game

            }
        })
    })
}


