import { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Privacy Policy | TechMission Rio",
  description: "Learn about how we process and protect student, educator, and donor personal data in accordance with LGPD and GDPR.",
}

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-16">
      <div className="max-w-[720px] mx-auto px-6 space-y-12 leading-relaxed text-gray-300">
        
        {/* Header */}
        <div className="border-b border-gray-900 pb-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Privacy Policy / Política de Privacidade</h1>
          <p className="text-xs text-gray-500 mt-2">
            Last Updated / Última Atualização: {lastUpdated}
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-900/50 pb-4">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">1. Introduction</h2>
              <p className="text-xs leading-relaxed">
                TechMission Rio (TMR) is committed to protecting the privacy of our student nominees, volunteer educators, and donors. This policy outlines how we collect, process, and store personal data in compliance with the Brazilian General Data Protection Law (**LGPD — Lei Geral de Proteção de Dados, Lei nº 13.709/2018**) and the General Data Protection Regulation (**GDPR**).
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">1. Introdução</h2>
              <p className="text-xs leading-relaxed">
                A TechMission Rio (TMR) está comprometida em proteger a privacidade de nossos estudantes indicados, educadores voluntários e doadores. Esta política descreve como coletamos, processamos e armazenamos dados pessoais em conformidade com a Lei Geral de Proteção de Dados (**LGPD — Lei nº 13.709/2018**) e o Regulamento Geral de Proteção de Dados (**GDPR**).
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-900/50 pb-4">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">2. What Data We Collect</h2>
              <p className="text-xs leading-relaxed">We collect and process the following categories of personal information:</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-400">
                <li><strong>Students</strong>: Full name, email address, campus location (FAETEC/IFRJ), current grade level, tech track focus recommendation, and financial/social justification details.</li>
                <li><strong>Educators</strong>: Full name, teacher account email, and Firebase UID.</li>
                <li><strong>Donors & Sponsors</strong>: Full name, transaction amount, billing currency, and email credentials logged via payment gateways (PayPal/Stripe). We do not store full credit card credentials.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">2. Dados Coletados</h2>
              <p className="text-xs leading-relaxed">Coletamos e processamos as seguintes categorias de informações pessoais:</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-400">
                <li><strong>Estudantes</strong>: Nome completo, endereço de e-mail, campus (FAETEC/IFRJ), série atual, trilha tecnológica recomendada e justificativa social e financeira.</li>
                <li><strong>Educadores</strong>: Nome completo, e-mail de registro de professor e UID de login do Firebase.</li>
                <li><strong>Doadores e Patrocinadores</strong>: Nome completo, valor da transação, moeda de cobrança e e-mail de registro enviado via gateways de pagamento (PayPal/Stripe). Não armazenamos dados de cartão de crédito.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-900/50 pb-4">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Legal Basis for Processing</h2>
              <p className="text-xs leading-relaxed">
                Under the LGPD, we process data based on:
              </p>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-400">
                <li><strong>LGPD Art. 7 (VI)</strong>: Exercise of regular rights in contract/process relations.</li>
                <li><strong>LGPD Art. 8</strong>: Informed, explicit teacher/sponsor consent.</li>
                <li><strong>LGPD Art. 14</strong>: Specific parental or legal guardian authorization for processing data of children and adolescents (minor consent).</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">3. Base Legal para Processamento</h2>
              <p className="text-xs leading-relaxed">
                De acordo com a LGPD, processamos dados com base em:
              </p>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-400">
                <li><strong>LGPD Art. 7 (VI)</strong>: Exercício regular de direitos em relações contratuais/processos.</li>
                <li><strong>LGPD Art. 8</strong>: Consentimento livre e informado de professores/patrocinadores.</li>
                <li><strong>LGPD Art. 14</strong>: Autorização específica dos pais ou responsável legal para o processamento de dados de crianças e adolescentes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-900/50 pb-4">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">4. Data Retention Periods</h2>
              <p className="text-xs leading-relaxed">We store personal data for as long as necessary for administrative compliance:</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-400">
                <li><strong>Approved Nominations</strong>: Retained for up to 3 years to measure long-term employment outcomes.</li>
                <li><strong>Archived/Rejected Nominations</strong>: Securely deleted from active files after 90 days.</li>
                <li><strong>Donor Transaction Records</strong>: Retained for 7 years for financial compliance and accounting audits.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">4. Período de Retenção de Dados</h2>
              <p className="text-xs leading-relaxed">Armazenamos dados pessoais pelo tempo necessário para conformidade administrativa:</p>
              <ul className="list-disc list-inside text-xs space-y-1 text-gray-400">
                <li><strong>Indicações Aprovadas</strong>: Mantidas por até 3 anos para medir resultados de empregabilidade.</li>
                <li><strong>Indicações Arquivadas/Rejeitadas</strong>: Excluídas com segurança após 90 dias.</li>
                <li><strong>Registros de Transações de Doadores</strong>: Mantidos por 7 anos para conformidade fiscal e auditorias contábeis.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-900/50 pb-4">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">5. Your Data Rights</h2>
              <p className="text-xs leading-relaxed">
                You have the right to request access, correction, deletion, and revocation of consent for any personal records. Contact us at <a href="mailto:privacy@techmissionrio.org" className="text-green-400 hover:underline">privacy@techmissionrio.org</a> to submit requests.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">5. Seus Direitos de Dados</h2>
              <p className="text-xs leading-relaxed">
                Você tem o direito de solicitar acesso, correção, exclusão e revogação do consentimento para quaisquer registros pessoais. Entre em contato conosco em <a href="mailto:privacy@techmissionrio.org" className="text-green-400 hover:underline">privacy@techmissionrio.org</a> para enviar solicitações.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-900/50 pb-4">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">6. Cross-Border Data Transfers</h2>
              <p className="text-xs leading-relaxed">
                Student and educator records may be accessed by authorized US church sponsors (LGPD Art. 33) to coordinate virtual mentorships. Data servers (Google Cloud/Firebase) are located primarily in US and Brazil regions under strong security parameters.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">6. Transferências Internacionais</h2>
              <p className="text-xs leading-relaxed">
                Registros de estudantes e educadores podem ser acessados por patrocinadores de igrejas americanas autorizados (LGPD Art. 33) para coordenar mentorias. Os servidores de dados (Google Cloud/Firebase) estão localizados principalmente nos EUA e Brasil.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
