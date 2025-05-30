import HeroSectionTwo from "@/components/HeroSectionTwo";
import CustomCalendar from "@/microComponents/Calendar";
import WhiteContainerText from "@/microComponents/WhiteContainerText";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "@/microComponents/InfiniteCardScroll";
import { useEffect, useState } from "react";
import EventCatDesc from "@/components/EventCatDesc";
import FourCardsSection from "@/components/FourCardsSection";
import { en } from "@/translations/en";
import { mk } from "@/translations/mk";
import { useLanguage } from "@/context/LanguageContext";
const translationsMap: Record<string, Record<string, string>> = {
  en,
  mk,
};
function HrWeekend() {
  const router = useRouter();
  const { language } = useLanguage();
  const translations = translationsMap[language];
  const [events, setEvents] = useState<Card[]>([]);
  useEffect(() => {
    fetch("https://mahr-be-upload.onrender.com/api/events")
      .then((res) => res.json())
      .then((data: Card[]) => setEvents(data));
  }, []);
  return (
    <>
      <Head>
        <title>MHRA</title>
        <meta name="description" content="Events MHRA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionTwo img1="/eventsImg/img2.jpg" img2="/eventsImg/img2.jpg">
        <>
          <WhiteContainerText
            title={translations.eventCategoryTitle2}
            customClass="blogHeroWhiteWrapper"
            text={translations.heroText}
            miniTitle={translations.heroMiniTitle}
          />
          <button className="buttonAni" onClick={() => router.push("/")}>
            {translations.buyTicketButton}
          </button>
        </>
      </HeroSectionTwo>

      <section className="calendarSection">
        <div className="calendarSecTextWrapper">
          <h2>{translations.calendarTitle}</h2>
          <p>{translations.calendarDescription}</p>
        </div>
        <CustomCalendar arrEvents={events} />
      </section>
      <EventCatDesc titleCat={translations.eventCategoryTitle2} />

      <section className="showCardsEventsSection">
        <div className="titlePageShowMoreLessWrapper">
          <h3>{translations.upcomingEv}</h3>
        </div>

        <FourCardsSection typeCards={"events"} />
      </section>
    </>
  );
}

export default HrWeekend;
