import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';

interface Props {
  title: string;
  text: string;
  val: string;
}

const FaqItem = ({ title, text, val }: Props) => {
  return (
    <AccordionItem value={val}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <p>{text}</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FaqItem;
