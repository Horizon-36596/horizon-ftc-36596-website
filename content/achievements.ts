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

  /**
   * The winning entry's render.
   *
   * TO ADD THE IMAGE: save the robot render as
   *   public/awards/cad-champion-robot.png
   * and this page will pick it up automatically. Until then a placeholder
   * panel is shown instead.
   */
  image: '/awards/cad-champion-robot.png',

  /** Alt text for the render. */
  imageAlt: 'The CAD entry Horizon designed to win the competition',

  /**
   * Paragraphs describing the entry. Add the design story here — one string
   * per paragraph.
   */
  // <!-- PLACEHOLDER: the team's own account of the design + the win -->
  description: [] as string[],
};
