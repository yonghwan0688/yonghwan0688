function solution(common) {
    if(common[1] - common[0] === common[2] - common[1]){
        const d1 = common[1] - common[0];
        return Number( common[common.length -1] + d1 );
    } else if (common[1] / common[0] === common[2] / common[1]){
        const d2 = common[1] / common[0];
        return Number( common[common.length -1] * d2 );
    }
}