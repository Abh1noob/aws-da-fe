import { AxiosError } from "axios";
import { useToast } from "./use-toast";
import { parseError } from "@/lib/utils";

const Toast = () => {
  const { toast } = useToast();

  const success = ({ message }: { message: string }) => {
    toast({ description: message, variant: "default" });
  };

  const error = ({ error }: { error: string }) => {
    toast({ description: error, variant: "destructive" });
  };

  const apiError = (error: unknown) => {
    const err = error as AxiosError;
    const errorMessage = parseError(err.response?.status);
    toast({ description: errorMessage, variant: "destructive" });
  };

  const promise = async (asyncFunction: () => Promise<void>) => {
    try {
      await asyncFunction();
      toast({ description: "Success", variant: "destructive" });
    } catch (error) {
      const err = error as AxiosError;
      const errorMessage = parseError(err.response?.status);
      toast({ description: errorMessage, variant: "destructive" });
    }
  };

  return { success, error, promise, apiError };
};

export default Toast;
