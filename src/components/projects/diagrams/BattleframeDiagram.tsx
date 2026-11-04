import flow from './Flow.module.css'
import styles from './BattleframeDiagram.module.css'

/**
 * How a turn reaches the screen in Battleframe. Traced from the source:
 * BattleUIFragment → BattleActivity.PerformAction → Battle.performAction →
 * BattleView.characterAction on the UI thread; BattleView.run() loops
 * update() / draw() / sleep() over a ConcurrentHashMap of GameObjects on its
 * own thread.
 */
export function BattleframeDiagram() {
  return (
    <div className={`${flow.diagram} ${styles.layout}`}>
      <section className={`${flow.node} ${styles.ui}`} aria-label="UI thread">
        <p className={flow.label}>UI thread</p>
        <p className={flow.title}>Activities and fragments</p>
        <ol className={flow.steps}>
          <li>The player picks an ability or item.</li>
          <li>
            <span className={flow.code}>Battle.performAction()</span> enforces turn order and mana cost, then applies the action to the opponent.
          </li>
          <li>
            On success, <span className={flow.code}>BattleView.characterAction()</span> sets the attacker’s animation
            state and adds a projectile for special abilities.
          </li>
        </ol>
        <p className={flow.note}>Opponent turns take the same path.</p>
      </section>

      <p className={`${flow.arrow} ${styles.toRegistry}`}>adds objects, sets state</p>

      <section className={`${flow.node} ${styles.registry}`} data-tone="accent" aria-label="Shared game objects">
        <p className={flow.label}>Shared game objects</p>
        <p className={flow.title}>Thread-safe object registry</p>
        <p className={flow.text}>
          A <span className={flow.code}>ConcurrentHashMap</span> the UI thread writes to while the render thread
          reads it every frame.
        </p>
        <div className={flow.chips}>
          <span className={flow.chip} data-tone="accent">
            CharacterObject
          </span>
          <span className={flow.chip} data-tone="accent">
            ProjectileObject
          </span>
        </div>
        <p className={flow.note}>
          Both extend <span className={flow.code}>GameObject</span>, which implements{' '}
          <span className={flow.code}>IGameObject</span>: <span className={flow.code}>OnUpdate()</span> and{' '}
          <span className={flow.code}>OnDraw(canvas)</span>.
        </p>
      </section>

      <p className={`${flow.arrow} ${styles.toRender}`}>read every frame</p>

      <section className={`${flow.node} ${styles.render}`} aria-label="Render thread">
        <p className={flow.label}>Render thread</p>
        <p className={flow.title}>
          <span className={flow.code}>BattleView</span>, a SurfaceView
        </p>
        <ol className={styles.loop} aria-label="Frame loop">
          <li>
            <span className={flow.code}>update()</span>
            <span>calls OnUpdate on every object</span>
          </li>
          <li>
            <span className={flow.code}>draw()</span>
            <span>locks the canvas and calls OnDraw</span>
          </li>
          <li>
            <span className={flow.code}>sleep()</span>
            <span>waits for the next frame, then repeats</span>
          </li>
        </ol>
        <p className={flow.note}>Running on its own thread keeps the UI thread free to respond.</p>
      </section>

      <section className={`${flow.node} ${styles.content}`} data-tone="quiet" aria-label="Game content">
        <p className={flow.label}>Game content</p>
        <p className={flow.text}>
          <span className={flow.code}>DataManager</span> loads abilities, items, and opponents from JSON with Gson and
          caches them. <span className={flow.code}>Ability</span> and <span className={flow.code}>Item</span> both
          implement <span className={flow.code}>Useable</span>, so a turn handles either the same way.
        </p>
      </section>
    </div>
  )
}
