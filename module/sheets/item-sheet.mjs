/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class Double_CrossItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["double_cross", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/double_cross/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.html`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.html`.
    return `${path}/item-${this.item.type}-sheet.html`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;
    if (itemData.type == "power"){
      context.skillslist = CONFIG.skillslist;
      context.timinglist = CONFIG.timinglist;
      context.difficultylist = CONFIG.difficultylist;
      context.targetlist = CONFIG.targetlist;
      context.rangelist = CONFIG.rangelist;
      context.encroachlist = CONFIG.encroachlist;
    }
    if (itemData.type == "lois"){
      context.loistypes = CONFIG.loistypes;
    }
    if (itemData.type == "weapon"){
      context.skillslist = CONFIG.skillslist;
      context.weapontypes = CONFIG.weapontypes;
    }
    if (itemData.type == "vehicle"){
      context.rideskills = CONFIG.rideskill;
    }
    console.log(context);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}
