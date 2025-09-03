import { Container } from '@/components/layout/container';
import { Accordion } from '@/components/ui/accordion';
import FaqItem from './faq-item';
import { Block } from '@/components/layout/Block';

export const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'Currently, we only offer Cash on Delivery (COD). This means you can comfortably shop and pay for your order only when it arrives at your doorstep.',
  },
  {
    question: 'Do I need to pay in advance?',
    answer:
      'No advance payment is required. With our Cash on Delivery option, you only pay once you receive and check your parcel.',
  },
  {
    question: 'Can I pay by card or bank transfer?',
    answer:
      'At the moment, we do not support online payment methods like card or bank transfer. We are working on adding secure online payment options in the future to make your shopping experience even smoother.',
  },
  {
    question: 'How long will delivery take?',
    answer:
      'We usually dispatch orders within 1–2 working days, and delivery takes 3–5 working days depending on your city. In major cities, delivery may be quicker.',
  },
  {
    question: 'Do you offer nationwide delivery?',
    answer:
      'Yes! We deliver across Pakistan so you can shop with us from anywhere in the country.',
  },
  {
    question: 'Will I be charged for shipping?',
    answer:
      'Shipping charges may vary based on your location. The exact delivery fee will be shown at checkout before you confirm your order.',
  },
];

export function FAQ() {
  return (
    <Block>
      <Container className='flex flex-col items-center space-y-5'>
        <h2 className='text-center text-2xl md:text-3xl font-semibold'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='w-sm md:w-xl'>
          {faqs.map((faq, i) => (
            <FaqItem
              title={faq.question}
              text={faq.answer}
              val={`item-${i + 1}`}
              key={i}
            />
          ))}
        </Accordion>
      </Container>
    </Block>
  );
}
