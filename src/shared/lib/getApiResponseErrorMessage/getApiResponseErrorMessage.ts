import axios from 'axios';
import type { ApiResponse } from '@uniteam31/uni-shared-types';

/** Достает сообщение из ответа от api */
export const getApiResponseErrorMessage = (error: unknown) => {
	if (!axios.isAxiosError(error)) {
		return;
	}

	const response = error.response?.data as ApiResponse<null>;
	return response.message;
};
