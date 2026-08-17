// ---------------------------------------------------------------------------
// ACHIEVEMENTS — real, verified team results only.
//
// Nothing in this file may be invented. Every claim here appears publicly on
// the site in front of judges and sponsors, so each field is either a fact the
// team confirmed or left undefined (the page then simply omits it).
// ---------------------------------------------------------------------------

export const cadChampionship = {
  /** Confirmed by the team: Horizon won it. */
  result: 'Champions',

  /**
   * The claim as the team stated it. Deliberately not dressed up with details
   * nobody has confirmed yet.
   */
  headline: 'The largest FTC CAD competition held to date',

  /** Confirmed by the team and by the event's public announcement. */
  competitionName: 'Chain Reaction',
  /** The organizer's full name for it. */
  competitionLongName: 'The 2026 Unofficial FTC Discord CAD Competition',

  /** Announced run dates, July 18–25 2026. */
  date: 'July 2026',

  /**
   * The entrant count is what backs the word "largest". Team-confirmed
   * 2026-08-16: 80+ submissions, Horizon ranked 1st.
   */
  fieldSize: '80+ team submissions',
  /** Just the count, for the figure slot in a stat pair. Its unit is the label. */
  fieldCount: '80+',
  /** Where Horizon finished in that field. */
  rank: '1st',

  /** Link to the results announcement or event page. Omitted while undefined. */
  // <!-- PLACEHOLDER: results / event URL -->
  link: undefined as string | undefined,

  /** The winning entry's name, confirmed by the team. */
  robotName: 'Ender',

  /**
   * The number Horizon competed under in the CAD competition. Different from
   * the official in-season team number, which is why the render reads 788 —
   * called out on the page so judges and sponsors aren't left guessing.
   */
  competedAs: '788',

  /**
   * The winning entry's render. Swap the file at this path to update it.
   * If the file is missing the page shows an instruction panel instead.
   */
  image: '/awards/ender-render.webp',

  /** Alt text for the render. */
  imageAlt:
    'Ender — a carbon-fibre competition robot with a raised arm and purple intake roller',

  /**
   * The render's pixel dimensions. Used to reserve the right amount of space
   * while the image loads so the page doesn't jump. If you swap the render for
   * one with a different shape, update these two numbers to match.
   */
  imageWidth: 2048,
  imageHeight: 817,

  /**
   * The entry, described using only confirmed facts. The design story — why the
   * team made the choices it made — is the team's to write.
   */
  description: [
    'Chain Reaction is a CAD-only competition: there is no field, no driver, and no build season to hide behind. Entrants get a brief and a deadline, and what they submit is a complete robot modeled in software, judged on the design itself.',
    'It drew more than 80 submissions, the largest field an FTC CAD competition has had. Horizon entered as 788 and ranked first, in the same summer the team was founded. Ender is the model that did it — which is why the render below carries 788 on the side panel rather than 36596.',
    // <!-- PLACEHOLDER: the team's own account of the design decisions in Ender —
    //      drivetrain concept, intake geometry, why the arm is laid out this
    //      way. One string per paragraph. -->
  ],
};
