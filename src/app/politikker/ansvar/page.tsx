import Link from "next/link";

export default function Ansvarspolitik() {
  return (
    <>
      <div className="priser__hero__container">
        <div className="priser__hero__indhold">
          <h1 className="home__hero__h1">Workflows <span className="home__hero__h1__span">ansvarspolitik</span>.</h1>
          <p className="home__hero__p">Læs Workflows ansvarspolitik i sektionerne nedenfor</p>
          <div className="home__hero__cta" style={{paddingTop: "20px"}}>
            <Link href="/kontakt" className="header__cta__btn__fill component__info__btn__fill">Kontakt os</Link>
            <Link href="/kontakt" className="header__cta__btn__transparent">Har du spørgsmål?</Link>
          </div>
        </div>
      </div>
      <div className="policy__container">
        <div className="policy__section">
            <h2 className="policy__section__h2">1. Dataansvarlig</h2>
            <p className="policy__section__p">Vi er dataansvarlig for behandlingen af de personoplysninger, som vi behandler om vores kunder og samarbejdspartnere. Du finder vores kontaktoplysninger nedenfor.</p>
            <p className="policy__section__p">Ascent Design</p>
            <p className="policy__section__p">Ivar Bentsens Vej 9</p>
            <p className="policy__section__p">CVR-nr.: 44253852</p>
            <p className="policy__section__p">Det er ikke et krav, at vores virksomhed har en ekstern DPO, men hvis du har spørgsmål til behandlingen af dine personoplysninger, så kan du kontakte os via support@workflow.dk.</p>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">2. Behandlingsaktiviteter</h2>
            <p className="policy__section__p">Som dataansvarlig jf. GDPR, så har vi følgende behandlingsaktiviteter.</p>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">2.1. Besøg på hjemmeside</h3>
                <p className="policy__section__p">Når du besøger vores hjemmeside, så anvender vi cookies for at hjemmesiden kan fungere, hvilket du kan læse mere om i vores <Link href="/cookiepolitik">Cookiepolitik</Link>.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">2.2 Kommunikation med potentielle kunder</h3>
                <p className="policy__section__p">Når du har spørgsmål til vores side, eller ønsker at høre mere om vores services, så kan du kontakte os via:</p>
                <p className="policy__section__p">Kontaktformular</p>
                <p className="policy__section__p">Email</p>
                <p className="policy__section__p">Herigennem vil vi behandle dine personoplysninger, så vi kan indgå i en dialog med dig fx svare på spørgsmål om vores ydelser. Vi behandler kun den information, som du giver os i forbindelse med vores kommunikation.</p>
                <p className="policy__section__p">Vi vil typisk behandle følgende almindelige oplysninger: navn, email, telefonnummer.</p>
                <p className="policy__section__p">Vores hjemmel til at behandle disse personoplysninger er databeskyttelsesforordningens artikel 6, stk. 1 litra f.</p>
                <p className="policy__section__p">Vi sletter vores kommunikation med dig når det står klart om du ønsker vores ydelser eller ej.</p>
                <p className="policy__section__p">Skulle der i et særligt tilfælde opstå et behov for at opbevare dine personoplysninger i længere tid, så vil dette kunne være tilfældet.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">2.3 Kommunikation med potentielle kunder</h3>
                <p className="policy__section__p">Vi har behov for at kommunikere med vores kunder, så vi sikrer os, at ydelsen leveres korrekt. Herigennem kan vi behandle oplysninger om navn, adresse, ydelser, særlige aftaler, betalingsinformationer og lignende. </p>
                <p className="policy__section__p">Hjemlen til at behandle disse personoplysninger er databeskyttelsesforordningens artikel 6, stk. 1 litra b.</p>
                <p className="policy__section__p">Når ydelsen er leveret og eventuelle udestående er afsluttede, så vil vi umiddelbart herefter slette personoplysningerne.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">2.4 Nyhedsbrev</h3>
                <p className="policy__section__p">Vi har et nyhedsbrev, som det er frivilligt at tilmelde sig – og du kan altid framelde dig dette igen.</p>
                <p className="policy__section__p">Formålet med nyhedsbrevet er at sende de tilmeldte mails med ny information fra virksomheden, som kan omhandle nyt indhold på hjemmesiden, annoncering af vores ydelser.</p>
                <p className="policy__section__p">Vi vil kun sende dig mails, hvis du har givet dit aktive samtykke til dette. Det kræver i første omgang, at du angiver din mailadresse, som vi efterfølgende sender en mail til, således at du kan bekræfte tilmeldingen. På denne måde, så sikrer vi, at du rent faktisk selv har tilmeldt dig nyhedsbrevet dvs. afgivet aktivt samtykke. </p>
                <p className="policy__section__p">Vores hjemmel til at behandle dine personoplysninger (dvs. mailadressen) i forbindelse med nyhedsbrevet vil være databeskyttelsesforordningens artikel 6, stk. 1 litra a.</p>
                <p className="policy__section__p">Vi vil behandle dine personoplysninger, så længe at du stadig er tilmeldt nyhedsbrevet. Ved afmeldelse af nyhedsbrevet, så stopper vi også med at sende dette til dig. Har vi ikke sendt dig et nyhedsbrev i 1 år, så bortfalder dit samtykke som følge af vores passivitet.</p>
                <p className="policy__section__p">Ved framelding af nyhedsbrevet, så gemmer vi dit nu tidligere samtykke i 2 år efter, at det senest er anvendt pga. forældelseskrav jf. Forbrugerombudsmandens spamvejledning afsnit 11.3. </p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">2.5 Bogføring</h3>
                <p className="policy__section__p">Vi skal gemme alle regnskabsbilag jf. bogføringsloven. Det betyder, at vi gemmer fakturaer og lignende bilag til brug for regnskabsføring. Heraf kan der fremgå almindelige personoplysninger som navn, adresse, ydelsesbeskrivelse.</p>
                <p className="policy__section__p">Vores hjemmel til at behandle personoplysninger til bogføringen er databeskyttelsesforordningens artikel 6, stk.1 litra.</p>
                <p className="policy__section__p">Vi opbevarer disse oplysninger i minimum 5 år efter at indeværende regnskabsår er afsluttet. </p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">2.6 Jobansøgninger</h3>
                <p className="policy__section__p">Vi tager glædeligt imod jobansøgninger med henblik på at vurdere om de matcher et ansættelsesbehov i vores virksomhed. </p>
                <p className="policy__section__p">Hvis du sender din jobansøgning til os, så er vores hjemmel til at behandle dine personoplysninger databeskyttelsesforordningens artikel 6, stk. 1 litra f. </p>
                <p className="policy__section__p">Hvis du har sendt en uopfordret ansøgning, så vil HR med det samme vurdere om din ansøgning er relevant, og herefter slette dine oplysninger igen, hvis der ikke er et match. </p>
                <p className="policy__section__p">Hvis du har sendt en ansøgning til et opslået job, så vil vi bortskaffe din ansøgning i det tilfælde, at du ikke ansættes, og umiddelbart efter at den rette kandidat er fundet til jobbet.</p>
                <p className="policy__section__p">Hvis du indgår i et rekrutteringsforløb og/elleransættes til jobbet, så vil vi give dig særskilt information om hvordan, at vi behandler dine personoplysninger i denne forbindelse. </p>
            </div>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">3. Databehandlere</h2>
            <p className="policy__section__p">Få kan klare alt selv, og det samme gælder os. Vi har derfor samarbejdspartnere, samt benytter os af leverandører, hvoraf nogle kan være databehandlere.</p>
            <p className="policy__section__p">Eksterne leverandører kan eksempelvis levere systemer til at organisere vores arbejde, services, rådgivning, IT-hosting eller markedsføring.</p>
            <p className="policy__section__p">[Databehandlere med virksomhedsnavn + formålet med behandlingen kommer snart...]</p>
            <p className="policy__section__p">Det er vores ansvar at sikre, at dine personoplysninger behandles ordentligt. Derfor stiller vi høje krav til vores samarbejdspartnere, og vores partnere skal garantere, at dine personoplysninger er beskyttet.</p>
            <p className="policy__section__p">Vi indgår derfor aftaler herom med virksomheder (databehandlere), der håndterer personoplysninger på vores vegne for at højne sikkerheden af dine personoplysninger.</p>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">4. Videregivelse af personoplysninger</h2>
            <p className="policy__section__p">Vi videregiver ikke dine personoplysninger til tredjemand.</p>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">5. Profilering og automatiserede afgørelser</h2>
            <p className="policy__section__p">Vi foretager ikke profilering eller automatiserede afgørelser.</p>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">6. Tredjelandeoverførsler</h2>
            <p className="policy__section__p">Vi benytter som udgangspunkt databehandlere i EU/EØS, eller som opbevarer data i EU/EØS. </p>
            <p className="policy__section__p">I nogle tilfælde er dette ikke muligt, og her kan der benyttes databehandlere udenfor EU/EØS, hvis disse kan give dine personoplysninger en passende beskyttelse.</p>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">7. Behandlingssikkerhed</h2>
            <p className="policy__section__p">Vi holder behandlingen af personoplysninger sikker ved at have indført passende tekniske og organisatoriske foranstaltninger. </p>
            <p className="policy__section__p">Vi har lavet risikovurderinger af vores behandling af personoplysninger, og har herefter indført passende tekniske og organisatoriske foranstaltninger for at øge behandlingssikkerheden.</p>
            <p className="policy__section__p">En af vores vigtigste foranstaltninger er at holde vores medarbejdere opdaterede om GDPR via løbende awareness træning, GDPR kursus, samt ved at gennemgå vores GDPR-procedurer med medarbejderne. </p>
        </div>
        <div className="policy__section">
            <h2 className="policy__section__h2">8. De registreredes rettigheder</h2>
            <p className="policy__section__p">Du har efter databeskyttelsesforordningen en række rettigheder i forhold til vores behandling af oplysninger om dig.</p>
            <p className="policy__section__p">Hvis du vil gøre brug af dine rettigheder skal du kontakte os, så vi kan hjælpe dig med dette.</p>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.1. Ret til at se oplysninger (indsigtsret)</h3>
                <p className="policy__section__p">Du har ret til at få indsigt i de oplysninger, som vi behandler om dig, samt en række yderligere oplysninger.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.2. Ret til berigtigelse (rettelse)</h3>
                <p className="policy__section__p">Du har ret til at få urigtige oplysninger om dig selv rettet.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.3. Ret til sletning</h3>
                <p className="policy__section__p">I særlige tilfælde har du ret til at få slettet oplysninger om dig, inden tidspunktet for vores almindelige generelle sletning indtræffer.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.4. Ret til begrænsning af behandling</h3>
                <p className="policy__section__p">Du har i visse tilfælde ret til at få behandlingen af dine personoplysninger begrænset. Hvis du har ret til at få begrænset behandlingen, må vi fremover kun behandle oplysningerne – bortset fra opbevaring – med dit samtykke, eller med henblik på at retskrav kan fastlægges, gøres gældende eller forsvares, eller for at beskytte en person eller vigtige samfundsinteresser.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.5. Ret til indsigelse</h3>
                <p className="policy__section__p">Du har i visse tilfælde ret til at gøre indsigelse mod vores ellers lovlige behandling af dine personoplysninger. Du kan også gøre indsigelse mod behandling af dine oplysninger til direkte markedsføring.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.6. Ret til at transmittere oplysninger (dataportabilitet)</h3>
                <p className="policy__section__p">Du har i visse tilfælde ret til at modtage dine personoplysninger i et struktureret, almindeligt anvendt og maskinlæsbart format samt at få overført disse personoplysninger fra én dataansvarlig til en anden uden hindring.</p>
                <p className="policy__section__p">Du kan læse mere om dine rettigheder i Datatilsynets vejledning om de registreredes rettigheder, som du finder på www.datatilsynet.dk.</p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.7. Tilbagetrækning af samtykke</h3>
                <p className="policy__section__p">Når vores behandling af dine personoplysninger er baseret på dit samtykke, så har du ret til at trække dit samtykke tilbage. </p>
            </div>
            <div className="policy__undersection">
                <h3 className="policy__section__h3">8.8. Klage til Datatilsynet</h3>
                <p className="policy__section__p">Du har ret til at indgive en klage til Datatilsynet, hvis du er utilfreds med den måde, vi behandler dine personoplysninger på. Du finder Datatilsynets kontaktoplysninger på www.datatilsynet.dk.</p>
                <p className="policy__section__p">Vi vil generelt opfordre dig til at læse mere om GDPR, så du er opdateret på reglerne.</p>
            </div>
        </div>
      </div>
    </>
  );
}
