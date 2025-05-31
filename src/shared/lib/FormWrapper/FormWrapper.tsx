import type { PropsWithChildren, ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

interface IFormWrapperProps<T extends FieldValues> {
	methods: UseFormReturn<T>;
	children?: ReactNode;
}

// TODO переименовать в FormContextWrapper
export const FormWrapper = <T extends FieldValues>(
	props: PropsWithChildren<IFormWrapperProps<T>>,
) => {
	const { methods, children } = props;

	return <FormProvider {...methods}>{children}</FormProvider>;
};
