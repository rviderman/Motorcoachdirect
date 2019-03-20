import american_dream_imperial_topaz from '../img/american_coach/2019 american dream imperial topaz.png'
import american_dream_inspiration_blue from '../img/american_coach/2019 american dream inspiration blue.png'
import american_dream_vintage_bordoux from '../img/american_coach/2019 american dream vintage bordoux.png'
import american_dream_volcano_gray from '../img/american_coach/2019 american dream volcano gray.png'
import american_dream_2018_amplify from '../img/american_coach/2018 American Dream Amplify.png'
import american_dream_2018_luster from '../img/american_coach/2018 American Dream Luster.png'
import american_dream_2018_pacific from '../img/american_coach/2018 American Dream Pacific.png'
import american_dream_2018_silverlight from '../img/american_coach/2018 American Dream Silverlight.png'
import american_eagle_maple_shadow from '../img/american_coach/2019 american eagle maple shadow.png'
import american_eagle_racewayred from '../img/american_coach/2019 american eagle racewayred.png'
import american_eagle_raspberrytruffle from '../img/american_coach/2019 american eagle raspberrytruffle.png'
import american_eagle_spiced_cider from '../img/american_coach/2019 american eagle spiced cider.png'
import dx3_cosmic_blue from '../img/dynamax/2019 DX3 Cosmic Blue.png'
import dx3_glacier from '../img/dynamax/2019 DX3 Glacier.png'
import dx3_midnight from '../img/dynamax/2019 DX3 Midnight.png'
import dx3_cabernet from '../img/dynamax/2019 DX3 Cabernet.png'
import force_hd_admiral_blue from '../img/dynamax/Force HD Admiral Blue.png'
import force_hd_black_mirage from '../img/dynamax/Force HD Black Mirage.png'
import force_hd_cabernet from '../img/dynamax/Force HD Cabernet.png'
import force_hd_desert_mirage from '../img/dynamax/Force HD Desert Mirage.png'
import force_hd_magnetic from '../img/dynamax/Force HD Magnetic.png'
import dynaquest_XL_midnight_sapphire from '../img/dynamax/DynaQuestXL Midnight.png'
import dynaquest_XL_briarwood from '../img/dynamax/DynaQuestXL Briarwood.png'
import dynaquest_XL_sunrise_canyon from '../img/dynamax/DynaQuestXL Sunrise Canyon.png'
import dynaquest_XL_Velocity from '../img/dynamax/DynaQuestXL Velocity.png'

const PaintsMap = {
    'American Coach': {
        '2019': {
            'American Dream': [
                {'Imperial Topaz':american_dream_imperial_topaz},
                {'Inspiration Blue':american_dream_inspiration_blue},
                {'Vintage Bordoux':american_dream_vintage_bordoux},
                {'Volcano Gray':american_dream_volcano_gray}
            ],                            
            'American Eagle': [
                {'Maple Shadow':american_eagle_maple_shadow},
                {'Racewayred':american_eagle_racewayred},
                {'Raspberrytruffle':american_eagle_raspberrytruffle},
                {'Spiced Cider':american_eagle_spiced_cider}
            ]
        },
        '2018': {
            'American Dream': [
                {'Amplify':american_dream_2018_amplify},
                {'Luster':american_dream_2018_luster},
                {'Pacific':american_dream_2018_pacific},
                {'Silverlight':american_dream_2018_silverlight}
            ]
        }
    },
    'Dynamax': {
        '2019': {
            'DX3': [                
                {'Cabernet':dx3_cabernet},
                {'Comsic Blue':dx3_cosmic_blue},
                {'Glacier':dx3_glacier},
                {'Midnight':dx3_midnight}
            ],
            'Force HD': [
                {'Admiral Blue':force_hd_admiral_blue},
                {'Black Mirage':force_hd_black_mirage},
                {'Cabernet':force_hd_cabernet},
                {'Desert Mirage':force_hd_desert_mirage},
                {'Magnetic':force_hd_magnetic}
            ],
            'DynaQuest XL': [
                {'Midnight Sapphire':dynaquest_XL_midnight_sapphire},
                {'Briarwood':dynaquest_XL_briarwood},
                {'Sunrise Canyon':dynaquest_XL_sunrise_canyon},
                {'Velocity Red':dynaquest_XL_Velocity}
            ]
        }
    }
}

export default PaintsMap