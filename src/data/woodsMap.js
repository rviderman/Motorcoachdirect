import chestnut_high_gloss from '../img/american_coach/chestnut high gloss.png'
import toffee_high_gloss from '../img/american_coach/toffee high gloss.png'
import dorian_gray_high_gloss from '../img/american_coach/dorian gray high gloss.png'
import driftwood from '../img/dynamax/driftwood.png'
import caramel from '../img/dynamax/caramel.png'

const WoodMap = {
    'American Coach': {
        '2019': [
            {'Chestnut High Gloss': chestnut_high_gloss},
            {'Toffee High Gloss': toffee_high_gloss},
            {'Dorian Gray High Gloss': dorian_gray_high_gloss}
        ],
        '2018': [
            {'Chestnut High Gloss': chestnut_high_gloss},
            {'Toffee High Gloss': toffee_high_gloss},
            {'Dorian Gray High Gloss': dorian_gray_high_gloss}
        ]
    },
    'Dynamax': {
        '2019': [
            {'Driftwood': driftwood},
            {'Caramel': caramel}
        ]
    }
}
export default WoodMap