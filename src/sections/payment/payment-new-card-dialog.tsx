import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvc: string;
};

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreate?: (data: FormValuesProps) => void;
};

export default function PaymentNewCardDialog({ open, onClose, onCreate }: Props) {
  const NewCardSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Card number is required'),
    cardName: Yup.string().required('Name is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
    cvc: Yup.string().required('CVC is required'),
  });

  const defaultValues = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewCardSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        onCreate?.(data);
        onClose();
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    [onClose, onCreate, reset]
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle> Add New Card </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <RHFTextField name="cardNumber" label="Card Number" />
            <RHFTextField name="cardName" label="Name on Card" />
            <RHFTextField name="expiryDate" label="Expiry Date" placeholder="MM/YY" />
            <RHFTextField name="cvc" label="CVC" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
