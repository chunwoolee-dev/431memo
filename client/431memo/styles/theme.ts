import { DefaultTheme } from "styled-components";

const colors = {
    primary : [
        '#CCE2FE',
        '#99C5F5',
        '#66A7E4',
        '#3387CB',
        '#1167AB',
        '#015495',
        '#004079',
        '#002B57',
        '#00162F',
    ],
    secondary : [
        '#FFFECC',
        '#FFF899',
        '#FFEC66',
        '#FFDC41',
        '#FFC72C',
        '#CCA712',
        '#998301',
        '#665C00',
        '#333000',
    ],
    tertiary : [
        '#FFFFFF',
        '#E0E4E6',
        '#C1C8CD',
        '#A3ADB3',
        '#869198',
        '#6A757C',
        '#4F595F',
        '#343C42',
        '#1A2024',
    ],
    danger : [
        '#FFCCCC',
        '#FE9D99',
        '#F77269',
        '#EB4C40',
        '#DA291C',
        '#B8190D',
        '#910C03',
        '#650400',
        '#330000',
    ],
    safe : [
        '#CCEECC',
        '#99DA99',
        '#66C266',
        '#33A733',
        '#068906',
        '#007400',
        '#005C00',
        '#004100',
        '#002200',
    ]
}
const common = {
    media : {
        'min' : '280px',
        'mobile' : '540px',
        'stab' : '900px',
        'btab' : '1240px',
        'laptop' : '1800px',
    },
    space : {
        's' : '4px',
        'm' : '8px',
        'b' : '16px'
    },
    border : [
        `1px solid ${colors.tertiary[2]}`
    ],
    animation : {
        'fade-in' : `animation:fade-in 0.34s both;`,
        'fade-out' : `animation:fade-out 0.34s both;`,
        'bottom-to-top' : `animation:bottom-to-top 0.64s both;`,
        'top-to-bottom' : `animation:top-to-bottom 0.34s both;`,
    },
    maxWidth : '880px'
}

interface Theme {
    [index: string]: DefaultTheme
}
const Theme = {
    light : {
        name : 'light',
        color : colors.tertiary[8],
        backgroundColor : colors.tertiary[0],
        paper : colors.tertiary[1]
    },
    dark : {
        name : 'dark',
        color : colors.tertiary[0],
        backgroundColor : colors.tertiary[8],
        paper : colors.tertiary[7],

        border : [
            `1px solid ${colors.tertiary[7]}`
        ]
    }
}


export const theme:Theme = {
    light : Object.assign({ colors : colors }, common, Theme.light),
    dark  : Object.assign({ colors : colors }, common, Theme.dark)
}