
-- Create a trigger to auto-decrement drug stock when a prescription is inserted
CREATE OR REPLACE FUNCTION public.decrement_drug_stock_on_prescription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.drugs
  SET current_stock = GREATEST(current_stock - NEW.quantity, 0)
  WHERE id = NEW.drug_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_prescription_insert
AFTER INSERT ON public.prescriptions
FOR EACH ROW
EXECUTE FUNCTION public.decrement_drug_stock_on_prescription();
