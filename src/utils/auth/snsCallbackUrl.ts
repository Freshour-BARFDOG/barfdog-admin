export const getSnsCallbackUrl = () => {
	return {
		snsCallbackUrl: sessionStorage.getItem('snsCallbackUrl')
	};
}

export const setSnsCallbackUrl = (callbackUrl: string) => sessionStorage.setItem('snsCallbackUrl', callbackUrl);

export const removeSnsCallbackUrl = () => sessionStorage.removeItem('snsCallbackUrl');