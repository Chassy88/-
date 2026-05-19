import TeamProfilePanel from '../components/TeamProfilePanel'

export default function TeamPage() {
  return (
    <main className="main-content">
      <header className="page-header">
        <h2 className="page-header__title">チーム</h2>
        <p className="page-header__desc">
          アカウントはチーム単位で管理します。所属チームとチーム写真を設定してください。
        </p>
      </header>

      <TeamProfilePanel />
    </main>
  )
}
