import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function useFormHandler<T extends FieldValues>(
  schema: yup.ObjectSchema<any>,
  defaultValues: DefaultValues<T>,
  mode: "all" | "onChange" | "onBlur"  = "onChange",
) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    trigger,
    reset,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState,
  } = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues,
    mode,
  });

  return {
    register,
    control,
    handleSubmit,
    errors,
    isValid,
    dirtyFields,
    isDirty,
    trigger,
    reset,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState,
  };
}
