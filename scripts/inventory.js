    /**
     * Clicking on inventory items bring them down to the combination slots
     * @param {Object} e The event object. Needed to access the target property
     */
    $(inventory.slots).click(e => {
        if (kitchen.roomState != 2){
                inventory.source = e.target.getAttribute('src');
                if (inventory.source != 'img/emptyslot.jpg') {
                    for(let i = 0; i < inventory.comboSlots.length; i++){
                        inventory.comboSource = inventory.comboSlots[i].getAttribute('src');
                        if (inventory.comboSource === 'img/comboslot.jpg'){
                        inventory.comboSlots[i].setAttribute('src', inventory.source);
                        break;
                    }
                }
            }       
        }
    })    

    /**
     * Clicking on items in the combination slots remove them from there
     * @param {Object} e The event object. Needed to access the target property
     */
    $(inventory.comboSlots).click(e => {
        inventory.comboSource = e.target.getAttribute('src');
        if (inventory.comboSource != 'img/comboslot.jpg'){
            e.target.setAttribute('src', 'img/comboslot.jpg');
        }
    })

    /**
     * Combine correct items in the combination slots
     */
    $('.combo button').click(() => {
        let comboSource1 = inventory.comboSlots[0].getAttribute('src');
        let comboSource2 = inventory.comboSlots[1].getAttribute('src');
        if (hallway.roomState === 7){
            if (comboSource1 === 'img/inventory/lipstick.jpg' && comboSource2 === 'img/inventory/paper.jpg' 
            || comboSource1 === 'img/inventory/paper.jpg' && comboSource2 === 'img/inventory/lipstick.jpg') {
                writeText('The maid: There you go. This is a map over the house. Use it to find your way to the other rooms.', '');
                $('.map-img').html('<img src="img/map.jpg" usemap="#room-map">');
                inventory.comboSlots[0].setAttribute('src', 'img/comboslot.jpg');
                inventory.comboSlots[1].setAttribute('src', 'img/comboslot.jpg');
                hallway.completion = 100;
                hallway.roomState = "Done";
                updateCompletion('Hallway', hallway.completion);
            }
        } 
        if (inRoom === 'basement' && kitchen.roomState === 4 && livingRoom.roomState >= 2){
            if (comboSource1 === 'img/inventory/hammer.jpg' && comboSource2 === 'img/inventory/liqnitro.jpg' 
            || comboSource1 === 'img/inventory/liqnitro.jpg' && comboSource2 === 'img/inventory/hammer.jpg') {
                basement.roomState = 1;
                stageTwoWriteText();              
                inventory.comboSlots[0].setAttribute('src', 'img/comboslot.jpg');
                inventory.comboSlots[1].setAttribute('src', 'img/comboslot.jpg');
                basement.completion = 25;
                updateCompletion('Basement', basement.completion);
                changeImage('img/basement.jpg');                
            }
        }               
    })

    /**
     * Using the key to open the kitchen drawer
     */
    $(inventory.slots[6]).click(() => {
        if (inRoom === 'kitchen' && bedroom.roomState === 3 && kitchen.roomState === 2){
            kitchen.roomState = 3;
            kitchen.completion = 75;
            updateCompletion("Kitchen", kitchen.completion)
            stageTwoWriteText();
        }
    })