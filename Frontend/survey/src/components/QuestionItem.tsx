import type{Question} from "../types";
import {Slider} from "primereact/slider"

type Props = {
    question : Question,
    worth: number,
    onChange: (value: number | [number, number]) => void
}

const QuestionItem=({question, worth, onChange}: Props) => {
    return (
        <div className="p-field p-mb-4">
            <label className="font-bold">{question.text}</label>
            <Slider
                min={1}
                max={10}
                value={worth}
                onChange={(e) => onChange(e.value)}
                className="w-full mt-2"
            />
        </div>
    );
}

export default QuestionItem;