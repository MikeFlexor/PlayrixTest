const app = new PIXI.Application();

// Инициализация переменных
let appSize = [1390, 640],
	appRatio = appSize[0] / appSize[1],
	renderer = PIXI.autoDetectRenderer(appSize[0], appSize[1], null),
	container = new PIXI.Container(),
	buttonPulsation = 0,
	hummerAnimCount = 0,
	showMenu = false,
	menuChoosed = 0,
	stairsAnim = 0,
	stairsAnimCount = 0,
	stairsFinishY1 = 0.03,
	stairsFinishY2 = 0.05,
	stairsFinishY3 = 0.035,
	logoRoll = false,
	logoSway = 0,
	backgroundSprite,
	decorBackSprite1,
	decorBackSprite2,
	decorBackSprite3,
	decorBackSprite4,
	decorBackSprite5,
	decorBackSprite6,
	stairsOldSprite,
	stairsNewSprite1,
	stairsNewSprite2,
	stairsNewSprite3,
	decorFrontSprite,
	austinSprite,
	iconHammerSprite,
	menuBackSprite1,
	menuBackSprite2,
	menuBackSprite3,
	menuChoosedSprite,
	menuOptionSprite1,
	menuOptionSprite2,
	menuOptionSprite3,
	menuOkSprite,
	logoSprite,
	buttonSprite,
	finalSprite;

// Функция изменения размера рендерера
function resize() {
	let w,
		h;
	
	if (window.innerWidth / window.innerHeight >= appRatio) {
		w = window.innerHeight * appRatio;
		h = window.innerHeight;
	} else {
		w = window.innerWidth;
		h = window.innerWidth / appRatio;
	}
	renderer.view.style.width = w + 'px';
	renderer.view.style.height = h + 'px';
	renderer.view.style.position = 'absolute';
	renderer.view.style.left = ((window.innerWidth - w﻿) >> 1) + 'px';
	renderer.view.style.top = ((window.innerHeight - h﻿) >> 1) + 'px';
}

document.body.appendChild(renderer.view);

resize();

window.onresize = function(event) {
	resize();
};

app.ticker.add(delta => update(delta));
app.ticker.stop();


////////// ЗАГРУЗКА ФАЙЛА ЛИСТА ТЕКСТУР ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
app.loader.add('spritesheet', 'https://raw.githubusercontent.com/MikeFlexor/PlayrixTest/master/spritesheet/spritesheet.json');
app.loader.load(setup);


////////// ДЕЙСТВИЯ, ВЫПОЛНЯЕМЫЕ ПОСЛЕ ЗАГРУЗКИ ЛИСТА ТЕКСТУР //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {
	// Создание текстур
	const backgroundTexture = PIXI.Texture.from('background.png');
	const decorBackTexture1 = PIXI.Texture.from('decor_back_1.png');
	const decorBackTexture2 = PIXI.Texture.from('decor_back_2.png');
	const decorBackTexture3 = PIXI.Texture.from('decor_back_3.png');
	const decorBackTexture4 = PIXI.Texture.from('decor_back_4.png');
	const decorBackTexture5 = PIXI.Texture.from('decor_back_5.png');
	const decorBackTexture6 = PIXI.Texture.from('decor_back_6.png');
	const stairsOldTexture = PIXI.Texture.from('stairs_old.png');
	const stairsNewTexture1 = PIXI.Texture.from('stairs_new_1.png');
	const stairsNewTexture2 = PIXI.Texture.from('stairs_new_2.png');
	const stairsNewTexture3 = PIXI.Texture.from('stairs_new_3.png');
	const decorFrontTexture = PIXI.Texture.from('decor_front.png');
	const austinTexture = PIXI.Texture.from('austin.png');
	const iconHammerTexture = PIXI.Texture.from('icon_hammer.png');
	const menuBackTexture = PIXI.Texture.from('menu_back.png');
	const menuChoosedTexture = PIXI.Texture.from('menu_choosed.png');
	const menuOptionTexture1 = PIXI.Texture.from('menu_option_1.png');
	const menuOptionTexture2 = PIXI.Texture.from('menu_option_2.png');
	const menuOptionTexture3 = PIXI.Texture.from('menu_option_3.png');
	const menuOkTexture = PIXI.Texture.from('menu_ok.png');
	const logoTexture = PIXI.Texture.from('logo.png');
	const buttonTexture = PIXI.Texture.from('button.png');
	const finalTexture = PIXI.Texture.from('final.png');
	
	// Создание спрайтов
	backgroundSprite = new PIXI.Sprite(backgroundTexture);
	decorBackSprite1 = new PIXI.Sprite(decorBackTexture1);
	decorBackSprite2 = new PIXI.Sprite(decorBackTexture2);
	decorBackSprite3 = new PIXI.Sprite(decorBackTexture3);
	decorBackSprite4 = new PIXI.Sprite(decorBackTexture4);
	decorBackSprite5 = new PIXI.Sprite(decorBackTexture5);
	decorBackSprite6 = new PIXI.Sprite(decorBackTexture6);
	stairsOldSprite = new PIXI.Sprite(stairsOldTexture);
	stairsNewSprite1 = new PIXI.Sprite(stairsNewTexture1);
	stairsNewSprite2 = new PIXI.Sprite(stairsNewTexture2);
	stairsNewSprite3 = new PIXI.Sprite(stairsNewTexture3);
	decorFrontSprite = new PIXI.Sprite(decorFrontTexture);
	austinSprite = new PIXI.Sprite(austinTexture);
	iconHammerSprite = new PIXI.Sprite(iconHammerTexture);
	menuBackSprite1 = new PIXI.Sprite(menuBackTexture);
	menuBackSprite2 = new PIXI.Sprite(menuBackTexture);
	menuBackSprite3 = new PIXI.Sprite(menuBackTexture);
	menuChoosedSprite = new PIXI.Sprite(menuChoosedTexture);
	menuOptionSprite1 = new PIXI.Sprite(menuOptionTexture1);
	menuOptionSprite2 = new PIXI.Sprite(menuOptionTexture2);
	menuOptionSprite3 = new PIXI.Sprite(menuOptionTexture3);
	menuOkSprite = new PIXI.Sprite(menuOkTexture);
	logoSprite = new PIXI.Sprite(logoTexture);
	buttonSprite = new PIXI.Sprite(buttonTexture);
	finalSprite = new PIXI.Sprite(finalTexture);
	
	// Настройки элементов декора
	decorBackSprite1.x = renderer.width * 0.33;
	decorBackSprite2.x = renderer.width * 0.09;
	decorBackSprite2.y = renderer.height * 0.51;
	decorBackSprite3.x = renderer.width * 0.6;
	decorBackSprite4.x = renderer.width * 0.06;
	decorBackSprite4.y = renderer.height * 0.17;
	decorBackSprite5.x = renderer.width * 0.815;
	decorBackSprite5.y = renderer.height * 0.25;
	decorBackSprite6.x = renderer.width * 0.145;
	decorBackSprite6.y = renderer.height * 0.3;
	decorFrontSprite.x = renderer.width * 0.805;
	decorFrontSprite.y = renderer.height - decorFrontSprite.height;
	
	// Настройки лестниц
	stairsOldSprite.x = renderer.width - stairsOldSprite.width;
	stairsOldSprite.y = renderer.height * 0.19;
	stairsNewSprite1.alpha = 0;
	stairsNewSprite1.x = renderer.width - stairsNewSprite1.width;
	stairsNewSprite1.y = renderer.height * 0.03;
	stairsNewSprite2.alpha = 0;
	stairsNewSprite2.x = renderer.width - stairsNewSprite2.width;
	stairsNewSprite2.y = renderer.height * 0.05;
	stairsNewSprite3.alpha = 0;
	stairsNewSprite3.x = renderer.width - stairsNewSprite3.width;
	stairsNewSprite3.y = renderer.height * 0.035;
	
	// Настройки Остина
	austinSprite.x = renderer.width * 0.5;
	austinSprite.y = renderer.height * 0.18;
	
	// Настройки иконки молотка
	iconHammerSprite.anchor.set(0.5, 0.5);
	iconHammerSprite.x = renderer.width * 0.82;
	iconHammerSprite.y = renderer.height * 0.5;
	iconHammerSprite.scale.set(0, 0);
	iconHammerSprite.interactive = true;
	iconHammerSprite.on('pointertap', function() {
		if (iconHammerSprite.scale.x == 1) {
			showMenu = true;
			hummerAnimCount = 2100;
		}
	});
	iconHammerSprite.on('pointerover', function() {
		iconHammerSprite.rotation += 0.2;
		iconHammerSprite.tint = 0xFFFFAA;
		iconHammerSprite.filters = [new PIXI.filters.GlowFilter()];
	});
	iconHammerSprite.on('pointerout', function() {
		iconHammerSprite.rotation -= 0.2;
		iconHammerSprite.tint = 0xFFFFFF;
		iconHammerSprite.filters = null;
	});
	
	// Настройки кнопок меню
	menuBackSprite1.x = renderer.width * 0.65;
	menuBackSprite1.y = renderer.height * -0.2;
	menuBackSprite1.anchor.set(0.5, 0.5);
	menuBackSprite1.interactive = true;
	menuBackSprite1.on('pointertap', onMenuTap);
	menuBackSprite1.on('pointerover', onMenuBackOver);
	menuBackSprite1.on('pointerout', onMenuBackOut);
	menuBackSprite2.x = renderer.width * 0.75;
	menuBackSprite2.y = renderer.height * -0.3;
	menuBackSprite2.anchor.set(0.5, 0.5);
	menuBackSprite2.interactive = true;
	menuBackSprite2.on('pointertap', onMenuTap);
	menuBackSprite2.on('pointerover', onMenuBackOver);
	menuBackSprite2.on('pointerout', onMenuBackOut);
	menuBackSprite3.x = renderer.width * 0.85;
	menuBackSprite3.y = renderer.height * -0.4;
	menuBackSprite3.anchor.set(0.5, 0.5);
	menuBackSprite3.interactive = true;
	menuBackSprite3.on('pointertap', onMenuTap);
	menuBackSprite3.on('pointerover', onMenuBackOver);
	menuBackSprite3.on('pointerout', onMenuBackOut);
	menuChoosedSprite.visible = false;
	menuChoosedSprite.anchor.set(0.5, 0.5);
	menuOptionSprite1.anchor.set(0.5, 0.5);
	menuOptionSprite2.anchor.set(0.5, 0.5);
	menuOptionSprite3.anchor.set(0.5, 0.5);
	function onMenuTap() {
		if (this == menuBackSprite1) {
			menuChoosed = 1;
			stairsAnim = 1;
			resetStairs();
		} else if (this == menuBackSprite2) {
			menuChoosed = 2;
			stairsAnim = 2;
			resetStairs();
		} else if (this == menuBackSprite3) {
			menuChoosed = 3;
			stairsAnim = 3;
			resetStairs();
		}
		function resetStairs() {
			stairsOldSprite.visible = false;
			stairsNewSprite1.alpha = 0;
			stairsNewSprite2.alpha = 0;
			stairsNewSprite3.alpha = 0;
			stairsNewSprite1.y = renderer.height * stairsFinishY1 - renderer.height * 0.1;
			stairsNewSprite2.y = renderer.height * stairsFinishY2 - renderer.height * 0.1;
			stairsNewSprite3.y = renderer.height * stairsFinishY3 - renderer.height * 0.1;
			stairsAnimCount = 30;
		}
	}
	function onMenuBackOver() {
		this.tint = 0xEEEEEE;
	}
	function onMenuBackOut() {
		this.tint = 0xFFFFFF;
	}
	
	// Настройки кнопки "Ok"
	menuOkSprite.visible = false;
	menuOkSprite.anchor.set(0.5, 0.5);
	menuOkSprite.interactive = true;
	menuOkSprite.on('pointertap', function() {
		finalSprite.visible = true;
	});
	menuOkSprite.on('pointerover', function() {
		menuOkSprite.tint = 0xDDDDFF;
	});
	menuOkSprite.on('pointerout', function() {
		menuOkSprite.tint = 0xFFFFFF;
	});
	
	// Настройки логотипа
	logoSprite.alpha = 0;
	logoSprite.anchor.set(0.5, 0.5);
	logoSprite.x = renderer.width * 0.13;
	logoSprite.y = renderer.height * 0.09;
	logoSprite.interactive = true;
	logoSprite.on('pointerover', function() {
		logoRoll = true;
	});
	logoSprite.on('pointerout', function() {
		logoRoll = false;
	});
	
	// Настройки кнопки "Continue"
	buttonSprite.anchor.set(0.5, 0.5);
	buttonSprite.x = renderer.width / 2;
	buttonSprite.y = renderer.height * 0.9;
	buttonSprite.interactive = true;
	buttonSprite.on('pointerover', function() {
		buttonSprite.tint = 0xDDDDFF;
		buttonSprite.filters = [new PIXI.filters.GlowFilter(20, 2, 0, 0xFF0000, 0.5)];
	});
	buttonSprite.on('pointerout', function() {
		buttonSprite.tint = 0xFFFFFF;
		buttonSprite.filters = null;
	});
	
	// Настройки финального изображения
	finalSprite.visible = false;
	
	// Добавление спрайтов в общий масштабируемый контейнер
	container.addChild(backgroundSprite);
	container.addChild(decorBackSprite1);
	container.addChild(decorBackSprite2);
	container.addChild(decorBackSprite3);
	container.addChild(decorBackSprite4);
	container.addChild(decorBackSprite5);
	container.addChild(decorBackSprite6);
	container.addChild(stairsOldSprite);
	container.addChild(stairsNewSprite1);
	container.addChild(stairsNewSprite2);
	container.addChild(stairsNewSprite3);
	container.addChild(decorFrontSprite);
	container.addChild(austinSprite);
	container.addChild(iconHammerSprite);
	container.addChild(menuBackSprite1);
	container.addChild(menuBackSprite2);
	container.addChild(menuBackSprite3);
	container.addChild(menuChoosedSprite);
	container.addChild(menuOptionSprite1);
	container.addChild(menuOptionSprite2);
	container.addChild(menuOptionSprite3);
	container.addChild(menuOkSprite);
	container.addChild(logoSprite);
	container.addChild(buttonSprite);
	container.addChild(finalSprite);
	
	// Запуск таймера
	app.ticker.start();
}


////////// ДЕЙСТВИЯ, ВЫПОЛНЯЕМЫЕ ПО ТИКУ ТАЙМЕРА ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function update(delta){
	// Остановка таймера после появления финального изображения
	if (finalSprite.visible == true) app.ticker.stop();
	
	// Анимация иконки с молотком
	if (hummerAnimCount < 1000) hummerAnimCount += delta;
	if (hummerAnimCount > 100 && hummerAnimCount < 1500) {
		if (iconHammerSprite.scale.x < 1) {
			iconHammerSprite.scale.set((hummerAnimCount - 100) / 10, (hummerAnimCount - 100) / 10);
		} else iconHammerSprite.scale.set(1, 1);
	}
	if (hummerAnimCount > 2000 - delta * 10) {
		hummerAnimCount -= delta * 10;
		if (iconHammerSprite.scale.x > 0) {
			iconHammerSprite.scale.set((hummerAnimCount - 2000) / 100, (hummerAnimCount - 2000) / 100);
		} else {
			iconHammerSprite.scale.set(0, 0);
			hummerAnimCount = 1800;
		}
	}
	
	// Анимация меню
	if (showMenu) {
		if (menuBackSprite1.y < renderer.height * 0.15) {
			menuBackSprite1.y += (renderer.height * 0.15 - menuBackSprite1.y) * delta / 8 + 1;
		} else {
			menuBackSprite1.y = renderer.height * 0.15
		}
		if (menuBackSprite2.y < renderer.height * 0.15) {
			menuBackSprite2.y += (renderer.height * 0.15 - menuBackSprite2.y) * delta / 12 + 1;
		} else {
			menuBackSprite2.y = renderer.height * 0.15
		}
		if (menuBackSprite3.y < renderer.height * 0.15) {
			menuBackSprite3.y += (renderer.height * 0.15 - menuBackSprite3.y) * delta / 16 + 1;
		} else {
			menuBackSprite3.y = renderer.height * 0.15
		}
	}
	if (menuChoosed == 1) {
		menuChoosedSprite.visible = true;
		menuChoosedSprite.x = menuBackSprite1.x;
		menuChoosedSprite.y = menuBackSprite1.y;
		menuOkSprite.visible = true;
		menuOkSprite.x = menuBackSprite1.x;
		menuOkSprite.y = menuBackSprite1.y + renderer.height * 0.14;
	} else if (menuChoosed == 2) {
		menuChoosedSprite.visible = true;
		menuChoosedSprite.x = menuBackSprite2.x;
		menuChoosedSprite.y = menuBackSprite2.y;
		menuOkSprite.visible = true;
		menuOkSprite.x = menuBackSprite2.x;
		menuOkSprite.y = menuBackSprite2.y + renderer.height * 0.14;
	} else if (menuChoosed == 3) {
		menuChoosedSprite.visible = true;
		menuChoosedSprite.x = menuBackSprite3.x;
		menuChoosedSprite.y = menuBackSprite3.y;
		menuOkSprite.visible = true;
		menuOkSprite.x = menuBackSprite3.x;
		menuOkSprite.y = menuBackSprite3.y + renderer.height * 0.14;
	}
	menuOptionSprite1.x = menuBackSprite1.x;
	menuOptionSprite1.y = menuBackSprite1.y - renderer.height * 0.005;
	menuOptionSprite2.x = menuBackSprite2.x;
	menuOptionSprite2.y = menuBackSprite2.y - renderer.height * 0.01;
	menuOptionSprite3.x = menuBackSprite3.x;
	menuOptionSprite3.y = menuBackSprite3.y - renderer.height * 0.005;
	
	// Анимация лестниц
	if (stairsAnimCount > 0) {
		if (stairsAnim == 1) {
			stairsAnimCount -= delta;
			stairsNewSprite1.alpha = 1 - (stairsAnimCount / 30);
			stairsNewSprite1.y = renderer.height * stairsFinishY1 - renderer.height * stairsAnimCount / 300;
		} else if (stairsAnim == 2) {
			stairsAnimCount -= delta;
			stairsNewSprite2.alpha = 1 - (stairsAnimCount / 30);
			stairsNewSprite2.y = renderer.height * stairsFinishY2 - renderer.height * stairsAnimCount / 300;
		} else if (stairsAnim == 3) {
			stairsAnimCount -= delta;
			stairsNewSprite3.alpha = 1 - (stairsAnimCount / 30);
			stairsNewSprite3.y = renderer.height * stairsFinishY3 - renderer.height * stairsAnimCount / 300;
		}
	}
	
	// Анимация логотипа
	if (logoSprite.alpha < 1) {
		logoSprite.alpha += 0.01 * delta;
	}
	if (logoRoll) {
		logoSway += delta / 15;
		logoSprite.rotation = Math.sin(logoSway) / 10;
	} else {
		logoSprite.rotation = 0;
		logoSway = 0;
	}
	
	// Анимация кнопки "Continue"
	buttonPulsation += delta / 15;
	buttonSprite.scale.x += Math.sin(buttonPulsation) / 200;
	buttonSprite.scale.y += Math.sin(buttonPulsation) / 200;
	
	// Рендеринг кадра
	renderer.render(container);
}