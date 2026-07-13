'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag, Store, Zap, Smartphone, Briefcase, MapPin, Play,
  Search, ShoppingCart, LayoutGrid, CreditCard, Home as HomeIcon, Check,
  Users, Package, Calendar, Truck, Handshake, Rocket, User, Phone,
  Mail, MessageSquare, Send, CheckCircle2, Loader2, Globe,
  Camera, AtSign, Video, Heart, Menu, X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const NEWS = [
  "Ufami, la 1ere plateforme d'achat echelonne en Cote d'Ivoire",
  'MyGUA disponible sur Play Store pour les vendeurs',
  "Nouveau partenariat avec +50 boutiques a Abidjan",
  'Payez a partir de 500 F, jusqu a 180 jours pour finaliser votre achat',
  'Plus de 1 000 produits disponibles sur ufami.ci',
  "Devenez vendeur partenaire Ufami des aujourd'hui",
];

const PARTNERS = [
  { name: 'CK Dress', cat: 'Mode & Vetements', color: '#7C3AED', bg: '#F5F3FF' },
  { name: 'Smart Technology', cat: 'Informatique & High-Tech', color: '#2563EB', bg: '#EFF6FF' },
  { name: 'Nasco', cat: 'Electromenager', color: '#EA580C', bg: '#FFF7ED' },
  { name: 'Boutique Gloire', cat: 'Mode & Accessoires', color: '#059669', bg: '#F0FDF4' },
  { name: 'Tech Abidjan', cat: 'Telephones & Tablettes', color: '#0891B2', bg: '#ECFEFF' },
  { name: 'Maison Plus', cat: 'Decoration & Maison', color: '#D97706', bg: '#FFFBEB' },
  { name: 'Sport Zone CI', cat: 'Sport & Fitness', color: '#DC2626', bg: '#FEF2F2' },
  { name: 'BioNaturel', cat: 'Beaute & Sante', color: '#16A34A', bg: '#F0FDF4' },
];

const MOCK_PRODUCTS = [
  { name: 'Ecouteurs Bluetooth', price: '15 000 F', rate: 'Des 500 F' },
  { name: 'Chaussures Sport', price: '22 500 F', rate: 'Des 750 F' },
  { name: 'Sac a main', price: '39 000 F', rate: 'Des 1 300 F' },
  { name: 'Montre connectee', price: '45 000 F', rate: 'Des 1 500 F' },
  { name: 'Casque audio Pro', price: '60 000 F', rate: 'Des 2 000 F' },
  { name: 'Ventilateur sur pied', price: '85 000 F', rate: 'Des 2 800 F' },
  { name: 'Smartphone Android', price: '120 000 F', rate: 'Des 4 000 F' },
  { name: 'Mini refrigerateur', price: '150 000 F', rate: 'Des 5 000 F' },
  { name: 'Television 43"', price: '210 000 F', rate: 'Des 7 000 F' },
  { name: 'Machine a laver', price: '285 000 F', rate: 'Des 9 500 F' },
  { name: 'iPhone 15 Pro', price: '575 000 F', rate: 'Des 10 000 F' },
  { name: 'Moto rechargeable', price: '750 000 F', rate: 'Des 12 000 F' },
];

const POSTES = [
  'Developpeur Full-Stack', 'Agent Commercial', 'Livreur',
  'Service Client', 'Marketing Digital', 'Comptable', 'Autre',
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({ nom: '', email: '', phone: '', poste: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [productIndex, setProductIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProductIndex(prev => (prev + 3) % MOCK_PRODUCTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const visibleProducts = [
    MOCK_PRODUCTS[productIndex % MOCK_PRODUCTS.length],
    MOCK_PRODUCTS[(productIndex + 1) % MOCK_PRODUCTS.length],
    MOCK_PRODUCTS[(productIndex + 2) % MOCK_PRODUCTS.length],
  ];

  const isFormValid = formData.nom.trim() && formData.email.trim() && formData.poste;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setSubmitting(true);
    setError('');
    const { error: err } = await supabase.from('job_applications').insert({
      nom: formData.nom.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      poste: formData.poste,
      message: formData.message.trim() || null,
    });
    if (err) {
      setError("Une erreur est survenue. Veuillez reessayer.");
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: '#111D4A', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#111D4A', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 24px rgba(0,0,0,.25)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, background: '#F5C800', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#111D4A' }}>U</div>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 19 }}>U'<span style={{ color: '#F5C800' }}>FAMI</span></span>
        </Link>

        <div style={{ display: 'none', gap: 24, alignItems: 'center' }} className="nav-links-desktop">
          <button onClick={() => scrollTo('how')} style={navLinkStyle}><Zap size={14} />Comment ca marche</button>
          <button onClick={() => scrollTo('apps')} style={navLinkStyle}><Smartphone size={14} />Nos Apps</button>
          <button onClick={() => scrollTo('partners')} style={navLinkStyle}><Store size={14} />Partenaires</button>
          <button onClick={() => scrollTo('careers')} style={navLinkStyle}><Briefcase size={14} />Carrieres</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="https://ufami.ci" style={{ background: '#F5C800', color: '#111D4A', border: 'none', padding: '11px 20px', borderRadius: 9, fontWeight: 800, fontSize: 13, cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
            <ShoppingBag size={15} />
            <span className="hide-mobile">Acheter maintenant</span>
          </a>
          <button onClick={() => setMobileMenu(!mobileMenu)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }} className="show-mobile">
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileMenu && (
        <div style={{ background: '#111D4A', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid rgba(255,255,255,.1)' }} className="show-mobile">
          <button onClick={() => { scrollTo('how'); setMobileMenu(false); }} style={{ ...navLinkStyle, padding: '10px 0' }}><Zap size={14} />Comment ca marche</button>
          <button onClick={() => { scrollTo('apps'); setMobileMenu(false); }} style={{ ...navLinkStyle, padding: '10px 0' }}><Smartphone size={14} />Nos Apps</button>
          <button onClick={() => { scrollTo('partners'); setMobileMenu(false); }} style={{ ...navLinkStyle, padding: '10px 0' }}><Store size={14} />Partenaires</button>
          <button onClick={() => { scrollTo('careers'); setMobileMenu(false); }} style={{ ...navLinkStyle, padding: '10px 0' }}><Briefcase size={14} />Carrieres</button>
        </div>
      )}

      {/* HERO */}
      <section style={{ background: '#111D4A', padding: '60px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'rgba(245,200,0,.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -80, width: 340, height: 340, borderRadius: '50%', background: 'rgba(245,200,0,.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'center' }} className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(245,200,0,.14)', border: '1px solid rgba(245,200,0,.35)', borderRadius: 20, padding: '5px 14px', marginBottom: 22 }}>
              <MapPin size={13} color="#F5C800" />
              <span style={{ color: '#F5C800', fontSize: 12, fontWeight: 600 }}>1ere plateforme d'achat echelonne en Cote d'Ivoire</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 38, fontWeight: 900, lineHeight: 1.15, marginBottom: 18 }}>
              Payez a partir de 500 F,<br /><span style={{ color: '#F5C800' }}>recevez votre produit</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 16, lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>
              La premiere plateforme d'achat echelonne de Cote d'Ivoire. Payez progressivement a partir de 500 F, sur une periode allant jusqu'a 180 jours, et recevez votre produit une fois le paiement termine.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(245,200,0,.3)', borderRadius: 12, padding: '10px 16px', marginBottom: 28 }}>
              <div style={{ width: 34, height: 34, background: '#F5C800', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#111D4A', fontWeight: 900, fontSize: 15 }}>500F</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>C'est tout ce qu'il vous faut pour commencer</div>
                <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 11 }}>Jusqu a 180 jours pour finaliser votre paiement.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 40, flexWrap: 'wrap' }}>
              <a href="https://play.google.com/store/apps/details?id=com.ufami.general" style={{ background: '#F5C800', color: '#111D4A', border: 'none', padding: '11px 20px', borderRadius: 9, fontWeight: 800, fontSize: 13, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                <Play size={15} />
                <div><div style={{ fontSize: 9, fontWeight: 500, opacity: .8 }}>Telecharger sur</div><div>Google Play</div></div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.ufami.vendor" style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)', padding: '11px 20px', borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
                <Store size={15} />
                <div><div style={{ fontSize: 9, opacity: .7 }}>Vous etes vendeur ?</div><div>MyGUA App</div></div>
              </a>
            </div>
            <div style={{ display: 'flex', gap: 36 }}>
              <div><div style={{ color: '#F5C800', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>500 F</div><div style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, marginTop: 3 }}>Montant minimum</div></div>
              <div><div style={{ color: '#F5C800', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>180j</div><div style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, marginTop: 3 }}>Periode max</div></div>
              <div><div style={{ color: '#F5C800', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>1ere</div><div style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, marginTop: 3 }}>En Cote d'Ivoire</div></div>
            </div>
          </div>

          <div className="hero-phone-col">
            <div style={{ width: 230, height: 460, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 36, padding: 16, margin: '0 auto', animation: 'float 4s ease-in-out infinite' }}>
              <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 22, height: '100%', padding: 13, display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={{ background: 'rgba(17,29,74,.8)', borderRadius: 12, padding: 12 }}>
                  <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, marginBottom: 3 }}>Bonjour Kouassi</div>
                  <div style={{ color: '#fff', fontSize: 15, fontWeight: 800 }}>Que cherchez-vous ?</div>
                  <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 6, padding: '6px 10px', marginTop: 8, color: 'rgba(255,255,255,.3)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Search size={11} /> Rechercher...
                  </div>
                </div>
                <div style={{ color: 'rgba(255,255,255,.3)', fontSize: 10, fontWeight: 600 }}>PRODUITS POPULAIRES</div>
                {visibleProducts.map((p, i) => (
                  <div key={`${p.name}-${productIndex}-${i}`} style={{ background: 'rgba(255,255,255,.07)', borderRadius: 10, padding: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'opacity 0.4s ease', animation: 'fadeInProduct 0.5s ease' }}>
                    <div><div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{p.name}</div><div style={{ color: '#F5C800', fontSize: 10, fontWeight: 700 }}>{p.price}</div></div>
                    <div style={{ background: '#F5C800', borderRadius: 5, padding: '3px 7px' }}><div style={{ color: '#111D4A', fontSize: 8, fontWeight: 800 }}>{p.rate}</div></div>
                  </div>
                ))}
                <div style={{ marginTop: 'auto', background: '#F5C800', borderRadius: 10, padding: 11, textAlign: 'center', color: '#111D4A', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <ShoppingCart size={13} /> Commander maintenant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: '#F5C800', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'ticker 30s linear infinite' }}>
          {[...NEWS, ...NEWS].map((n, i) => (
            <span key={i} style={{ display: 'inline-block', padding: '0 40px', color: '#111D4A', fontWeight: 700, fontSize: 13 }}>{n}</span>
          ))}
        </div>
      </div>

      {/* COMMENT CA MARCHE */}
      <section id="how" style={{ padding: '60px 24px', background: '#F5F6FA' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(17,29,74,.07)', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: '#111D4A', marginBottom: 14 }}>
              <Zap size={13} /> Simple et rapide
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10, color: '#111D4A' }}>Comment ca marche ?</h2>
            <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 40 }}>4 etapes simples pour obtenir vos produits preferes</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            {[
              { icon: LayoutGrid, num: 1, title: 'Parcourez', desc: 'Decouvrez des milliers de produits sur ufami.ci ou l\'application mobile' },
              { icon: CreditCard, num: 2, title: 'Choisissez', desc: 'Optez pour le paiement cash ou echelonne, des 500 F, sur une periode allant jusqu a 180 jours' },
              { icon: Smartphone, num: 3, title: 'Payez', desc: 'Via Orange Money, Wave, MTN MoMo ou Moov Money en quelques secondes' },
              { icon: HomeIcon, num: 4, title: 'Recevez', desc: 'Une fois votre paiement termine, votre produit vous est livre ou disponible en agence' },
            ].map(step => (
              <div key={step.num} style={{ background: '#fff', borderRadius: 16, padding: 26, border: '1px solid #E5E7EB', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 14, right: 14, width: 24, height: 24, background: '#111D4A', color: '#F5C800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900 }}>{step.num}</div>
                <div style={{ width: 56, height: 56, background: 'rgba(17,29,74,.07)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#111D4A' }}>
                  <step.icon size={26} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: '#111D4A' }}>{step.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS APPS */}
      <section id="apps" style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10, color: '#111D4A' }}>Nos Applications</h2>
            <p style={{ color: '#6B7280', fontSize: 16, marginBottom: 40 }}>Disponibles sur Android — iOS bientot</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            <div style={{ background: '#111D4A', borderRadius: 22, padding: 36, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: '#F5C800', opacity: .1 }} />
              <div style={{ position: 'relative' }}>
                <div style={{ width: 52, height: 52, background: '#F5C800', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: '#111D4A' }}><ShoppingBag size={24} /></div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.4)', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}><Users size={11} /> POUR LES ACHETEURS</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 11 }}>Ufami App</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', lineHeight: 1.65, marginBottom: 22 }}>Choisissez un produit, mettez de cote a votre rythme des 500 F, sur une periode allant jusqu a 180 jours. Vous recevez des que le paiement est termine.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 26 }}>
                  {['Catalogue de 1 000+ produits', "Des 500 F, aucun apport exige", 'Orange Money, Wave, MTN, Moov', 'Suivi de votre paiement en temps reel'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                      <div style={{ width: 18, height: 18, background: '#F5C800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#111D4A' }}><Check size={11} /></div>
                      {f}
                    </div>
                  ))}
                </div>
                <a href="https://play.google.com/store/apps/details?id=com.ufami.general" style={{ background: '#F5C800', color: '#111D4A', border: 'none', padding: '14px 26px', borderRadius: 9, fontWeight: 800, fontSize: 14, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Play size={15} /> Telecharger sur Play Store
                </a>
              </div>
            </div>
            <div style={{ background: '#F5C800', borderRadius: 22, padding: 36, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: '#111D4A', opacity: .1 }} />
              <div style={{ position: 'relative' }}>
                <div style={{ width: 52, height: 52, background: '#111D4A', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: '#F5C800' }}><Store size={24} /></div>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(17,29,74,.55)', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}><Package size={11} /> POUR LES VENDEURS</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#111D4A', marginBottom: 11 }}>MyGUA App</div>
                <p style={{ fontSize: 14, color: 'rgba(17,29,74,.7)', lineHeight: 1.65, marginBottom: 22 }}>Gerez vos commandes, suivez vos gains et developpez votre boutique avec Ufami comme partenaire commercial.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 26 }}>
                  {['Gestion commandes en temps reel', 'Tableau de bord et statistiques', '100% de votre prix de vente', 'Support Ufami dedie'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'rgba(17,29,74,.75)' }}>
                      <div style={{ width: 18, height: 18, background: '#111D4A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#F5C800' }}><Check size={11} /></div>
                      {f}
                    </div>
                  ))}
                </div>
                <a href="https://play.google.com/store/apps/details?id=com.ufami.vendor" style={{ background: '#111D4A', color: '#F5C800', border: 'none', padding: '14px 26px', borderRadius: 9, fontWeight: 800, fontSize: 14, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  <Play size={15} /> Telecharger MyGUA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#111D4A', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 28, textAlign: 'center' }}>
          {[
            { icon: Package, val: '1 000+', label: 'Produits disponibles' },
            { icon: Store, val: '50+', label: 'Vendeurs partenaires' },
            { icon: Calendar, val: '500 F', label: 'Montant minimum' },
            { icon: Truck, val: '180j', label: 'Periode maximum' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ color: '#F5C800', fontSize: 36, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
                <s.icon size={14} color="rgba(255,255,255,.4)" />
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 14 }}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTENAIRES */}
      <section id="partners" style={{ padding: '60px 0', background: '#F5F6FA' }}>
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(17,29,74,.07)', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: '#111D4A', marginBottom: 14 }}>
            <Handshake size={13} /> Vendeurs partenaires
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10, color: '#111D4A' }}>Ils vendent sur Ufami</h2>
          <p style={{ color: '#6B7280', fontSize: 16 }}>Des boutiques de confiance pour vous offrir le meilleur</p>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', animation: 'carousel 25s linear infinite', width: 'max-content' }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} style={{ margin: '0 12px', background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '16px 28px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, flexShrink: 0, background: p.bg, color: p.color }}>
                  {p.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#111D4A' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>{p.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARRIERES */}
      <section id="careers" style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(245,200,0,.2)', border: '1px solid #F5C800', borderRadius: 20, padding: '5px 14px', marginBottom: 14, fontSize: 12, fontWeight: 700, color: '#111D4A' }}>
              <Rocket size={13} /> Nous recrutons !
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10, color: '#111D4A' }}>Rejoignez l'equipe Ufami</h2>
            <p style={{ color: '#6B7280', fontSize: 16 }}>Construisons ensemble l'avenir du e-commerce en Afrique</p>
          </div>

          {submitted ? (
            <div style={{ background: '#F0FDF4', border: '2px solid #16A34A', borderRadius: 16, padding: 48, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: '#16A34A' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#15803D', margin: '0 0 10px' }}>Candidature envoyee !</h3>
              <p style={{ color: '#166534', fontSize: 15, lineHeight: 1.65 }}>
                Merci <strong>{formData.nom}</strong> ! Nous avons recu votre candidature pour le poste de <strong>{formData.poste}</strong>. Nous vous contacterons sur <strong>{formData.email}</strong> dans les plus brefs delais.
              </p>
            </div>
          ) : (
            <div style={{ background: '#F5F6FA', borderRadius: 20, padding: 36, border: '1px solid #E5E7EB' }}>
              {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 14 }}>{error}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }} className="form-row">
                <div>
                  <label style={labelStyle}><User size={12} /> Nom complet *</label>
                  <input type="text" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} placeholder="Kouassi Kan Clovis" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}><Phone size={12} /> Telephone</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="07 00 00 00 00" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}><Mail size={12} /> Email *</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="votre@email.com" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}><Briefcase size={12} /> Poste souhaite *</label>
                <select value={formData.poste} onChange={e => setFormData({ ...formData, poste: e.target.value })} style={inputStyle}>
                  <option value="">Selectionnez un poste</option>
                  {POSTES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}><MessageSquare size={12} /> Parlez-nous de vous</label>
                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} placeholder="Votre experience, competences, pourquoi Ufami..." style={{ ...inputStyle, resize: 'vertical' as const }} />
              </div>
              <button onClick={handleSubmit} disabled={!isFormValid || submitting}
                style={{ width: '100%', background: isFormValid ? '#111D4A' : '#E5E7EB', color: isFormValid ? '#fff' : '#6B7280', border: 'none', padding: 15, borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: isFormValid ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111D4A', padding: '48px 24px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, background: '#F5C800', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#111D4A' }}>U</div>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 18 }}>U'<span style={{ color: '#F5C800' }}>FAMI</span></span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.75, maxWidth: 250, marginBottom: 18, color: 'rgba(255,255,255,.55)' }}>La premiere plateforme BNPL de Cote d'Ivoire. Achetez maintenant, payez en 30 tranches journalieres.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[Globe, Camera, AtSign, Video].map((Icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, background: 'rgba(255,255,255,.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,.6)' }}><Icon size={15} /></div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Plateforme</div>
              {['Catalogue', 'Comment ca marche', 'Devenir vendeur', 'Blog'].map(l => <div key={l} style={{ fontSize: 13, marginBottom: 9, color: 'rgba(255,255,255,.55)' }}>{l}</div>)}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Entreprise</div>
              {['A propos', 'Carrieres', 'Partenaires', 'Presse'].map(l => <div key={l} style={{ fontSize: 13, marginBottom: 9, color: 'rgba(255,255,255,.55)' }}>{l}</div>)}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Support</div>
              {['Centre d\'aide', 'Contact', 'Conditions', 'Confidentialite'].map(l => <div key={l} style={{ fontSize: 13, marginBottom: 9, color: 'rgba(255,255,255,.55)' }}>{l}</div>)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 22, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
            <span>© 2026 Ufami Group. Tous droits reserves.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#F5C800' }}>
              <Heart size={13} /><span>Made in Cote d'Ivoire</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeInProduct { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes carousel { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .hero-phone-col { display: none; }
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex !important; }
          .show-mobile { display: none !important; }
          .hero-grid { grid-template-columns: 1fr .85fr !important; }
          .hero-phone-col { display: block !important; }
        }
        @media (max-width: 767px) {
          .hide-mobile { display: none; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const navLinkStyle: React.CSSProperties = { color: 'rgba(255,255,255,.75)', fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: 5 };
const labelStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#111D4A', marginBottom: 5 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '11px 13px', borderRadius: 9, border: '1.5px solid #E5E7EB', fontSize: 13, background: '#fff', color: '#111D4A', fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none' };