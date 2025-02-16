import useSWR from 'swr';
import { axiosInstance } from 'shared/api';
import { ApiResponse, INote } from 'shared/types';
import { getApiResponseErrorMessage } from 'shared/lib';

type TGetNotesResponse = ApiResponse<INote[]>;

export const useGetNotes = () => {
	const fetcher = () =>
		axiosInstance<TGetNotesResponse>({ method: 'GET', url: '/notes' }).then(
			(res) => res.data.data,
		);

	const { data, error, isValidating, mutate } = useSWR('api/notes', fetcher);

	const notes = data || [];

	return {
		mutateNotes: mutate,
		notes,
		error: getApiResponseErrorMessage(error),
		isLoading: isValidating,
	};
};
