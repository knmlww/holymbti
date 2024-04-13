const initialState = {
	iScore: 0, //MBTI I 성향
	eScore: 0, //MBTI E 성향
	nScore : 0, //MBTI N 성향
	sScore: 0, //MBTI S 성향
	tScore : 0, //MBTI T 성향
	fScore : 0, //MBTI F 성향
	jScore : 0, //MBTI J 성향
	pScore : 0, //MBTI P 성향  
	resultMBTI: null
}

export default function scoreReducer(state = initialState, action) {
	switch (action.type) {
		case "I":
			return{
			...state,
			iScore : state.iScore + 1 
			}
		case "E":
				return{
				...state,
				eScore : state.eScore + 1 
			}
		case "N":
				return{
				...state,
				nScore : state.nScore + 1 
			}
		case "S":
				return{
				...state,
				sScore : state.sScore + 1 
			}
		case "T":
				return{
				...state,
				tScore : state.tScore + 1 
			}
		case "F":
				return{
				...state,
				fScore : state.fScore + 1 
			}
		case "J":
				return{
				...state,
				jScore : state.jScore + 1 
			}
		case "P":
				return{
				...state,
				pScore : state.pScore + 1 
			}
		case "SAVE_RESULT":
				return{
				...state,
				resultMBTI : action.payload 
			}
		case "CLEAR_SCORE":
				return{
				...state,
				iScore : 0,
				eScore : 0,
				nScore : 0,
				sScore : 0,
				tScore : 0,
				fScore : 0,
				jScore : 0,
				pScore : 0,
				resultMBTI : null
		}					
		default:
			return state
	}

}