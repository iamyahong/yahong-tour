export interface FormData {
  preferred_date: string;
  alternative_date: string;
  num_people: number;
  age_group: string;
  selected_modules: string[];
  request_message: string;
  name: string;
  email: string;
  line_id: string;
  stay_period: string;
}

export const defaultFormData: FormData = {
  preferred_date: "",
  alternative_date: "",
  num_people: 2,
  age_group: "",
  selected_modules: [],
  request_message: "",
  name: "",
  email: "",
  line_id: "",
  stay_period: "",
};
