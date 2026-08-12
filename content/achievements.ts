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

  /** Official event name. Leave undefined until confirmed — the page omits it. */
  // <!-- PLACEHOLDER: official competition name -->
  competitionName: undefined as string | undefined,

  /** e.g. '2026' or 'Summer 2026'. Omitted while undefined. */
  // <!-- PLACEHOLDER: when it was held -->
  date: undefined as string | undefined,

  /** e.g. '120 teams'. This is what backs the word "largest" — confirm before filling. */
  // <!-- PLACEHOLDER: field size / number of entrants -->
  fieldSize: undefined as string | undefined,

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
   * Paragraphs describing the entry. Add the design story here — one string
   * per paragraph.
   */
  // <!-- PLACEHOLDER: the team's own account of the design + the win -->
  description: [] as string[],
};
