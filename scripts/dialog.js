/**
 * Print dialog message and commands depending on which room user is in and in which stage
 */
const stageTwoWriteText = () => {
    switch (inRoom){
        case 'hallway':
            switch (hallway.roomState){
                case 0:
                    writeText('You: Ok I´m inside. It´s cold and dark. I don´t want to stay here for any longer than I have to. Maybe I should start looking for clues right away.', '/Search hallway  /Search other room');
                    break;
                case 1:
                    writeText('You: Ok, so there is nothing of value in the hallway. All I found was an old piece of paper, a lipstick and a bell. How does that help me solving a murder?', '/Add to inventory');
                    break;
                case 2:
                    writeText('Game: -Come on! It´s a big house. At this stage, you have no idea how to get to the other rooms.', '/Search hallway  /Search other room');
                    break;
                case 3:
                    writeText('You: Maybe I should get a closer look at these items.', '/Examine paper  /Examine lipstick  /Examine bell');
                    break;
                case 4:
                    writeText('Ding ding ding, ...oh someone is coming... I guess this bell is used to call on the maid.', '/Interrogate her  /Ask for map');
                    break;
                case 5:
                    writeText('You: Just a normal lipstick. It has been used though.', '/Examine paper  /Examine lipstick  /Examine bell');
                    break;
                case 6:
                    writeText('You: Looks just like an old piece of paper. Nothing special about it.', '/Examine paper  /Examine lipstick  /Examine bell');
                    break;
                case 7:
                    writeText('The maid: I can draw you a map of the house. I need something to draw on and something to draw with', '');
                    break;
                case 8:
                    writeText('You: She admit Mrs Smith was not a very nice person and deserved what happened to her. But she denies any involvement in the murder. Claims she was sleeping at the time.', '/Interrogate her  /Ask for map');
                    break;
            }
            break;
        case 'livingRoom':
            switch (livingRoom.roomState){
                case 0:
                    writeText('You: The murder happened in here. You can see there was a struggle between the victim and the murderer.', '/Search living room');
                    break;
                case 1:
                    writeText('You: Found a hammer. The victim was stabbed with a knife, but everything that can be used as a weapon is intresting to me.', '/Add to inventory');
                    break;
                case 2:
                    writeText('You: Nothing to do here right now...', '');
                    break;
                case 3:
                    writeText('You: The body is taken away to the coroner. There seem to be something written in blood where the body were..', '/Write it down');
                    break;
                case 4:
                    writeText('You: Done with this room', '');
                    break;
            }
            break;
        case 'kitchen':
            switch (kitchen.roomState){
                case 0:
                    writeText('You: Kitchen looks neat and clean. I can definitley go for a snack.', '/Search kitchen');
                    break;
                case 1:
                    writeText('You: Well, look at this! A chef´s hat, and there is some red stains on it. Blood? Also there is a drawer that can´t be opened.', '/Add to inventory');
                    break;
                case 2:
                    writeText('You: I need something to open that kitchen drawer with...', '');
                    break;
                case 3:
                    writeText('You: The rusty key opened the kitchen drawer. Inside is another key and a can of liquid nitrogen. Weird thing to keep in the kitchen drawer.', '/Add both to inventory');
                    break;
                case 4:
                    writeText('You: I´m done with this room.', '');
                    break;
            }
            break;
        case 'bedroom':
            switch (bedroom.roomState){
                case 0:
                    writeText('You: This is the victim´s bedroom. She and her husband used seperate bedrooms.', '/Search bedroom');
                    break;
                case 1:
                    writeText('You: The victim had a safety security box. But I need some kind of code to open it. I think I have to tell the correct order of the colors. There is blue, yellow, pink, orange and green.', 'color color color color');
                    break;
                case 2:
                    writeText('You: Nailed it! Inside is a love letter from a secret admirer and a rusty key.', '/Add to inventory');
                    break;
                case 3:
                    writeText('You: I´m done with this room.', '');
            }
            break;
        case 'basement':
            switch (basement.roomState){
                case 0:
                    writeText('You: Hmm, the door is locked. I need a key or something to be able to open it.', '');
                    break;
                case 1:
                    writeText('You: I frooze the lock with the liquid nitrogen and smashed it to pieces with the hammer. The basement door is now open. Let´s go down the stairs.', '/Search basement');
                    break;
                case 2:
                    writeText('You: The basement is completley empty except from a safe in the dark corner, barely visible.', '/Examine safe');
                    break;
                case 3:
                    writeText('You: I need a 6 digit code to open it. But I can´t even try, the wiring is broken. The safe doesen´t get any power right now.', '/Fix wiring');
                    break;
                case 5:
                    writeText('You: Great, now the safe have power. I can now enter the 6 digit code to open it.', 'number number number number number number');
                    break;
                case 6:
                    writeText('You: Sweet, it´s open. I found the murder weapon. A bloody kitchen knife and a lot of love letters waiting to be sent. Also a note: -"If I can´t have her, no-one can."', '/Think');
                    break;
                case 7:
                    writeText('You: The owner of this safe is the murderer. It contained the murder weapon and the murderer was unhappily in love with Mrs Smith. I have all the clues to figure out who the murderer is.', 'Type in the murderer´s first name');
                    break;
                case 8:
                    writeText('Game: CONGRATULATIONS!! You found the murderer. Good job!.', '');
                    break;
                case 9:
                    writeText('Game: That is not the murderer', 'Type in the murderer´s first name');
                    break;
            }
            break;    
    }   
}