import Accordion from "~/src/components/Accordion/Accordion"
import AccordionItem from "~/src/components/Accordion/AccordionItem/AccordionItem";
export default function Home2() {
  return (
    <Accordion defaultIndex="1" onItemClick={console.log}>
      <AccordionItem label="A" index="1" key="1">
        Lorem ipsum
      </AccordionItem>
      <AccordionItem label="B" index="2" key="2">
        Dolor sit amet
      </AccordionItem>
    </Accordion>
  );
}
