import { content } from '../data/content'

function Row({ depth = 0, icon, label, active, onClick, folder, bullet }) {
  return (
    <button className={`tree-row ${active ? 'active' : ''}`} onClick={onClick}>
      {Array.from({ length: depth }).map((_, i) => (
        <span className="indent" key={i} />
      ))}
      {folder ? <span className="chev">▾</span> : <span className="bullet">{bullet ? '•' : ''}</span>}
      <span className={`file-ico ${icon}`} />
      <span className={folder ? 'folder-name' : ''}>{label}</span>
    </button>
  )
}

export default function Sidebar({ active, onNavigate, onOpenProject }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="sidebar-avatar">{content.monogram}</div>
        <div className="who">
          <b>{content.firstName}</b>
          <span>Portfolio</span>
        </div>
      </div>
      <nav className="explorer" aria-label="Sections">
        <div className="explorer-bar">
          <span className="dot r" />
          <span className="dot y" />
          <span className="dot g" />
          <span className="label">explorer</span>
        </div>
        <Row icon="jsx" label="home.jsx" bullet active={active === 'top'} onClick={() => onNavigate('top')} />
        <Row icon="md" label="about.md" active={active === 'about'} onClick={() => onNavigate('about')} />
        <Row icon="folder" label="skills" folder onClick={() => onNavigate('skills')} />
        <Row
          depth={1}
          icon="md"
          label="skills.json"
          bullet
          active={active === 'skills'}
          onClick={() => onNavigate('skills')}
        />
        <Row icon="folder" label="projects" folder onClick={() => onNavigate('work')} />
        {content.projects.map((p, i) => (
          <Row
            key={p.id}
            depth={1}
            icon="jsx"
            label={p.file}
            bullet
            active={false}
            onClick={() => onOpenProject(i)}
          />
        ))}
        <Row icon="md" label="experience.md" active={active === 'experience'} onClick={() => onNavigate('experience')} />
        <Row icon="jsx" label="contact.jsx" bullet active={active === 'contact'} onClick={() => onNavigate('contact')} />
      </nav>
    </aside>
  )
}
