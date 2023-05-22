export interface OptionSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  charCount: number;
}

export interface ResultProps {
  result: string;
  resultRef: React.RefObject<HTMLDivElement>;
}