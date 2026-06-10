import React, { useState, useMemo } from 'react'
import {
  Shield,
  FileText,
  BarChart3,
  Users,
  Award,
  Clock,
  Sparkles,
  Download,
  Calendar,
  Search,
  Sliders
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

// Local SVG Icons for robust compilation and fallback
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const XCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const AlertCircleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// Static competitor data
const competitors = [
  {
    id: 1,
    name: "Crystal Wellness India",
    platform: "Instagram (@crystalwellnessindia)",
    followers: 89400,
    avgPostsPerWeek: 5,
    themes: ["Crystal healing", "chakra balancing", "meditation", "product showcases"],
    bestPostType: "Carousel (avg 4.2% engagement)",
    worstPostType: "Static image (avg 1.1% engagement)",
    tone: "Spiritual, soft, feminine, mystical",
    hashtags: "Mix of broad (#crystalhealing 2.1M) and niche (#shungitestone 45K)",
    engagementRate: 3.8,
    websiteContent: "Blog with 2 posts/month, no SEO optimisation",
    postingTimes: "7–9 AM and 7–9 PM IST",
    strengths: [
      "Strong visual consistency — dark purple aesthetic",
      "High Reel frequency — 3 Reels/week",
      "Good use of user-generated content"
    ],
    weaknesses: [
      "No LinkedIn presence",
      "Weak product education content",
      "No B2B content whatsoever"
    ]
  },
  {
    id: 2,
    name: "EMF Shield Pro",
    platform: "Instagram (@emfshieldpro_in)",
    followers: 34200,
    avgPostsPerWeek: 3,
    themes: ["EMF radiation facts", "product demos", "scientific studies", "testimonials"],
    bestPostType: "Educational Reel (avg 6.1% engagement)",
    worstPostType: "Story (avg 0.8% engagement)",
    tone: "Scientific, authoritative, technical",
    hashtags: "Niche focus (#emfprotection 890K, #5gprotection 450K, #emfshield 120K)",
    engagementRate: 4.2,
    websiteContent: "Detailed product pages, some scientific references",
    postingTimes: "12–2 PM IST weekdays only",
    strengths: [
      "Strong educational content — builds trust",
      "Highest engagement rate of 3 competitors",
      "Good use of scientific references"
    ],
    weaknesses: [
      "Very low follower count",
      "No lifestyle content — too clinical",
      "Inconsistent posting schedule"
    ]
  },
  {
    id: 3,
    name: "AyurVeda Natural Store",
    platform: "Instagram (@ayurvedanaturalstore)",
    followers: 215600,
    avgPostsPerWeek: 7,
    themes: ["Ayurvedic products", "natural healing", "herbs", "wellness lifestyle", "Indian tradition"],
    bestPostType: "Static product post (avg 2.8% engagement)",
    worstPostType: "LinkedIn article (avg 1.2% engagement)",
    tone: "Traditional, warm, Indian cultural, educational",
    hashtags: "Very broad (#ayurveda 12M, #naturalhealing 8M, #indianwellness 2.3M)",
    engagementRate: 2.4,
    websiteContent: "Large blog, 8+ posts/month, basic SEO",
    postingTimes: "Morning 6–8 AM IST daily",
    strengths: [
      "Largest following — strong brand awareness",
      "High posting frequency",
      "Strong Indian cultural connection"
    ],
    weaknesses: [
      "Lowest engagement rate despite biggest following",
      "No EMF-specific content",
      "Generic content — not differentiated"
    ]
  }
]

// Comparison Criteria
const criteriaList = [
  { field: "Followers", label: "Followers", cw: "89,400", ep: "34,200", av: "215,600", ss: "10,000 (Month 3)" },
  { field: "Posts/Week", label: "Posts/Week", cw: "5", ep: "3", av: "7", ss: "5" },
  { field: "Avg Engagement", label: "Avg Engagement", cw: "3.8%", ep: "4.2%", av: "2.4%", ss: "5%+ target" },
  { field: "Best Format", label: "Best Format", cw: "Carousel", ep: "Reel", av: "Static", ss: "Reel + Carousel" },
  { field: "LinkedIn Active", label: "LinkedIn Active", cw: "No", ep: "No", av: "Limited", ss: "Yes — B2B focus" },
  { field: "Website Blog", label: "Website Blog", cw: "Basic", ep: "Limited", av: "Active", ss: "Weekly target" },
  { field: "Hashtag Strategy", label: "Hashtag Strategy", cw: "Mixed", ep: "Niche", av: "Broad", ss: "Niche + Medium" },
  { field: "B2B Content", label: "B2B Content", cw: "None", ep: "None", av: "None", ss: "Yes — differentiator" },
  { field: "Scientific Content", label: "Scientific Content", cw: "None", ep: "Strong", av: "None", ss: "Moderate" },
  { field: "Price Transparency", label: "Price Transparency", cw: "Hidden", ep: "Shown", av: "Shown", ss: "Shown" },
  { field: "UGC Usage", label: "UGC Usage", cw: "High", ep: "Low", av: "Medium", ss: "High target" }
]

// Recommendations list
const recommendations = [
  {
    rank: 1,
    title: "Own the Educational EMF Content Space",
    analysis: "EMF Shield Pro has the highest engagement (4.2%) purely through educational content — but only 34K followers. Crystal Wellness and AyurVeda Natural have zero EMF education. This is a wide open gap.",
    action: "Publish 2 educational EMF Reels per week explaining radiation risks, Shungite science, and placement tips. Use niche hashtags: #emfprotection #shungite #5gprotection",
    expectedImpact: "3x higher engagement than competitor average"
  },
  {
    rank: 2,
    title: "Be the Only Brand With B2B Content",
    analysis: "Zero competitors create B2B-focused content. All 3 are purely B2C. GO-BRICS Business Lab has a B2B sales function — this is a unique differentiator.",
    action: "Post 1 LinkedIn article per week targeting Ayurvedic retailers, yoga studios, and corporate wellness buyers. Share case studies and wholesale information.",
    expectedImpact: "Exclusive ownership of B2B wellness content niche on LinkedIn"
  },
  {
    rank: 3,
    title: "Post Reels at Competitor Off-Hours",
    analysis: "Crystal Wellness posts 7–9 AM and 7–9 PM. AyurVeda posts 6–8 AM. EMF Shield posts 12–2 PM. 12–2 PM and 8–10 PM slots are underserved.",
    action: "Schedule Reels at 8 PM IST Tuesday and Thursday — peak engagement window with lowest competition",
    expectedImpact: "20–40% higher organic reach"
  },
  {
    rank: 4,
    title: "Combine Spiritual + Scientific Tone",
    analysis: "Crystal Wellness is spiritual but not scientific. EMF Shield is scientific but not spiritual. Neither brand bridges both worlds — a significant gap for Shungite which is both ancient AND scientifically studied.",
    action: "Develop a content tone that blends both: 'Ancient wisdom, modern science' — reference Nobel Prize research alongside Vedic tradition",
    expectedImpact: "Appeals to both wellness seekers AND science-minded consumers"
  },
  {
    rank: 5,
    title: "Leverage UGC Like Crystal Wellness",
    analysis: "Crystal Wellness drives strong engagement partly through user-generated content (UGC) — customer photos and testimonials. Shungite Shield can replicate this with a branded hashtag campaign.",
    action: "Launch #ShungiteShieldStory campaign — ask customers to share photos of their Shungite at home. Repost top submissions weekly.",
    expectedImpact: "Free content pipeline + social proof"
  }
]

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('All')

  // Interactive Target Metric Simulator States
  const [simPostsPerWeek, setSimPostsPerWeek] = useState(5)
  const [simEmfPercentage, setSimEmfPercentage] = useState(50)
  const [simB2BArticlesPerWeek, setSimB2BArticlesPerWeek] = useState(1)
  const [simHasUgc, setSimHasUgc] = useState(true)

  // Chart data
  const chartData = [
    { name: 'AyurVeda Natural', rate: 2.4, color: '#94A3B8' },
    { name: 'Crystal Wellness', rate: 3.8, color: '#A855F7' },
    { name: 'EMF Shield Pro', rate: 4.2, color: '#3B82F6' },
    { name: 'Shungite Shield (Target)', rate: 5.0, color: '#00FF41' }
  ]

  // Simulated metrics calculator
  const simulatedResults = useMemo(() => {
    // Base engagement rate calculation based on selections
    let engagementRate = 2.5
    
    // Impact of EMF education (EMF content tends to have higher engagement based on EMF Shield Pro)
    engagementRate += (simEmfPercentage / 100) * 1.5

    // Impact of Posting frequency (diminishing returns beyond optimal 5)
    if (simPostsPerWeek >= 3 && simPostsPerWeek <= 6) {
      engagementRate += 0.8
    } else {
      engagementRate += 0.3
    }

    // UGC impact
    if (simHasUgc) {
      engagementRate += 0.9
    }

    // Cap engagement rate at realistic boundaries
    engagementRate = Math.min(Math.max(engagementRate, 1.5), 7.2)

    // Opportunity Score calculation
    let opportunityScore = 6.0
    // Shungite Shield is uniquely positioned. Having B2B and EMF education boosts opportunities
    if (simB2BArticlesPerWeek >= 1) {
      opportunityScore += 1.5
    }
    if (simEmfPercentage > 40) {
      opportunityScore += 1.0
    }
    if (simHasUgc) {
      opportunityScore += 0.5
    }
    if (simPostsPerWeek >= 4) {
      opportunityScore += 0.5
    }
    opportunityScore = Math.min(opportunityScore, 10.0)

    return {
      engagement: parseFloat(engagementRate.toFixed(1)),
      opportunity: parseFloat(opportunityScore.toFixed(1))
    }
  }, [simPostsPerWeek, simEmfPercentage, simB2BArticlesPerWeek, simHasUgc])

  // Filtered competitors for Brand Profiles Tab
  const filteredCompetitors = useMemo(() => {
    return competitors.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            brand.themes.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesPlatform = selectedPlatform === 'All' || brand.platform.includes(selectedPlatform)
      return matchesSearch && matchesPlatform
    })
  }, [searchTerm, selectedPlatform])

  return (
    <>
      {/* ========================================================================= */}
      {/* SCREEN VIEW (HIDDEN IN PRINT) */}
      {/* ========================================================================= */}
      <div className="print:hidden min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col selection:bg-[#00FF41] selection:text-black">
        {/* Top Navbar */}
        <header className="border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-2 rounded-lg glow-green-box">
                <Shield className="w-6 h-6 text-[#00FF41]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-widest text-[#00FF41] font-mono font-bold uppercase">GO-BRICS Business Lab</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF41]"></span>
                  <span className="text-xs text-gray-500 font-mono">TASK_C07</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-white mt-0.5">Competitor Content Audit Report</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2E2E2E] border border-[#2E2E2E] hover:border-[#00FF41] text-white hover:text-[#00FF41] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Full Report PDF</span>
                <span className="sm:hidden">Print</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section Banner */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1A1A1A]/30 to-transparent py-8 border-b border-[#1A1A1A]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20">
                  Active Audit Report
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-white">Shungite Shield Marketing Intelligence</h2>
                <p className="text-gray-400 mt-1 max-w-2xl text-sm">
                  Comparative study of three key wellness competitors in the Indian wellness and EMF protection market space.
                </p>
              </div>
              <div className="bg-[#1A1A1A]/80 border border-[#2E2E2E] px-4 py-3 rounded-lg flex items-center gap-3 self-start md:self-auto backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-[#00FF41]" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Audit Timeline</div>
                  <div className="text-sm font-semibold text-white">May – June 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Tab Selector */}
          <div className="flex border-b border-[#1A1A1A] mb-8 overflow-x-auto pb-px scrollbar-none gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'profiles', label: 'Brand Profiles', icon: Users },
              { id: 'comparison', label: 'Comparison Table', icon: BarChart3 },
              { id: 'recommendations', label: 'Strategic Recommendations', icon: Award }
            ].map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 border-b-2 font-medium text-sm transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-[#00FF41] text-[#00FF41] bg-[#00FF41]/5'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-[#1A1A1A]/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00FF41]' : 'text-gray-400'}`} />
                  {tab.label}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"></span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab Content Wrapper */}
          <div className="animate-fade-in">
            {/* ------------------------------------------------------------- */}
            {/* TAB 1: OVERVIEW */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Report Header Card */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-6 glow-green-box transition-all duration-300">
                    <div className="border-b border-[#2E2E2E] pb-4 mb-4">
                      <div className="text-xs font-mono text-[#00FF41] uppercase tracking-wider">Audit metadata</div>
                      <h3 className="text-xl font-bold text-white mt-1">Audit Details</h3>
                    </div>
                    
                    <ul className="space-y-4 text-sm">
                      <li className="flex flex-col">
                        <span className="text-xs text-gray-500 font-mono uppercase">Brand Audited For</span>
                        <span className="font-semibold text-white mt-0.5">Shungite Shield</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-xs text-gray-500 font-mono uppercase">Competitors Analysed</span>
                        <span className="font-semibold text-white mt-0.5">3 Brands</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-xs text-gray-500 font-mono uppercase">Platforms Covered</span>
                        <span className="font-semibold text-white mt-0.5">Instagram, LinkedIn, Website</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-xs text-gray-500 font-mono uppercase">Audit Period</span>
                        <span className="font-semibold text-white mt-0.5">May–June 2026</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-xs text-gray-500 font-mono uppercase">Prepared by</span>
                        <span className="font-semibold text-white mt-0.5">GO-BRICS Business Lab Content Team</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-xs text-gray-500 font-mono uppercase">Date</span>
                        <span className="font-semibold text-white mt-0.5">June 2026</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right Column: Intro & Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Introduction Card */}
                    <div className="bg-[#1A1A1A]/80 border border-[#2E2E2E] rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#00FF41]/10 px-3 py-1 rounded-bl-lg border-l border-b border-[#00FF41]/20 font-mono text-[10px] text-[#00FF41]">
                        EXECUTIVE SUMMARY
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Introduction</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        This competitor content audit analyses the social media and website content strategy of three key competitors in the Indian wellness and EMF protection space. The audit covers content themes, posting frequency, best-performing post types, tone of voice, hashtag strategy, and estimated engagement rates for each brand. The findings are used to identify content gaps and opportunities for Shungite Shield to differentiate and outperform competitors in the Indian wellness market.
                      </p>
                    </div>

                    {/* 4 Summary Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Brands Audited", val: "3", sub: "Wellness competitors", color: "text-white" },
                        { label: "Total Posts Analysed", val: "180+", sub: "Across all channels", color: "text-[#00FF41]" },
                        { label: "Avg Competitor Engagement", val: "3.2%", sub: "Industry benchmark", color: "text-white" },
                        { label: "Our Opportunity Score", val: "8.5/10", sub: "EMF niche headroom", color: "text-[#00FF41]" }
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-[#1A1A1A] border border-[#2E2E2E] p-4 rounded-xl flex flex-col justify-between hover:border-gray-700 transition-all duration-300">
                          <span className="text-xs text-gray-500 font-mono uppercase leading-tight">{stat.label}</span>
                          <div className="mt-4">
                            <span className={`text-2xl font-extrabold tracking-tight ${stat.color}`}>{stat.val}</span>
                            <span className="block text-[10px] text-gray-500 mt-1 font-mono">{stat.sub}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Insight block */}
                <div className="bg-[#1A1A1A]/40 border border-[#2E2E2E] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-[#00FF41]/10 p-3 rounded-full border border-[#00FF41]/20 text-[#00FF41] self-start md:self-center">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Why Shungite Shield? Key Market Opportunity</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Our research reveals that traditional spiritual wellness brands lack scientific backing, while clinical brands lack visual appeal and lifestyle engagement. Shungite Shield stands in the sweet spot: ancient geological lineage combined with verified EMF protection science.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 2: BRAND PROFILES */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'profiles' && (
              <div className="space-y-8">
                {/* Search and Filter Panel */}
                <div className="flex flex-col md:flex-row gap-4 bg-[#1A1A1A] border border-[#2E2E2E] p-4 rounded-xl justify-between items-center">
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search themes or brand names..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-[#2E2E2E] text-white text-sm pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#00FF41] transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <span className="text-xs text-gray-500 font-mono uppercase whitespace-nowrap">Filter platform:</span>
                    {['All', 'Instagram', 'LinkedIn', 'Website'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`text-xs px-3 py-1.5 rounded-md border font-mono transition-all cursor-pointer ${
                          selectedPlatform === platform
                            ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]'
                            : 'bg-[#0A0A0A] border-[#2E2E2E] text-gray-400 hover:text-white'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredCompetitors.length === 0 ? (
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-12 text-center">
                    <AlertCircleIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No competitor brands match your filter criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {filteredCompetitors.map(brand => (
                      <div
                        key={brand.id}
                        className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl flex flex-col justify-between hover:border-gray-700 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Card Top Banner Accent */}
                        <div className={`h-1.5 w-full ${
                          brand.id === 1 ? 'bg-purple-600' : brand.id === 2 ? 'bg-blue-600' : 'bg-orange-500'
                        }`}></div>

                        <div className="p-6 space-y-6">
                          {/* Brand Info */}
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-white">{brand.name}</h3>
                              <span className="text-xs font-mono text-[#00FF41] bg-[#00FF41]/10 border border-[#00FF41]/20 px-2 py-0.5 rounded">
                                ER: {brand.engagementRate}%
                              </span>
                            </div>
                            <p className="text-xs text-[#00FF41] font-mono mt-1">{brand.platform}</p>
                          </div>

                          {/* Quick Stats Grid */}
                          <div className="grid grid-cols-2 gap-4 bg-[#0A0A0A]/50 border border-[#2E2E2E]/40 p-3 rounded-lg text-xs font-mono">
                            <div>
                              <span className="text-gray-500 block">Followers</span>
                              <span className="text-white font-bold text-sm mt-0.5 block">{brand.followers.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Posts / Week</span>
                              <span className="text-white font-bold text-sm mt-0.5 block">{brand.avgPostsPerWeek}</span>
                            </div>
                          </div>

                          {/* Profile Data Points */}
                          <div className="space-y-3 text-xs leading-relaxed">
                            <div>
                              <span className="text-gray-500 block font-mono">Content Themes:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {brand.themes.map((theme, i) => (
                                  <span key={i} className="bg-[#2E2E2E] text-white px-2 py-0.5 rounded text-[10px]">
                                    {theme}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                              <div>
                                <span className="text-gray-500 font-mono block">Best Format</span>
                                <span className="text-green-400 font-medium">{brand.bestPostType}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 font-mono block">Worst Format</span>
                                <span className="text-red-400 font-medium">{brand.worstPostType}</span>
                              </div>
                            </div>

                            <div className="pt-2">
                              <span className="text-gray-500 font-mono block">Tone of Voice:</span>
                              <span className="text-white">{brand.tone}</span>
                            </div>

                            <div className="pt-2">
                              <span className="text-gray-500 font-mono block">Hashtag Strategy:</span>
                              <span className="text-white">{brand.hashtags}</span>
                            </div>

                            <div className="pt-2">
                              <span className="text-gray-500 font-mono block">Website Content:</span>
                              <span className="text-white">{brand.websiteContent}</span>
                            </div>

                            <div className="pt-2 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-gray-500" />
                              <div>
                                <span className="text-gray-500 font-mono inline mr-1">Posting Times:</span>
                                <span className="text-white font-mono">{brand.postingTimes}</span>
                              </div>
                            </div>
                          </div>

                          {/* Strengths & Weaknesses */}
                          <div className="border-t border-[#2E2E2E] pt-4 grid grid-cols-1 gap-4">
                            {/* Strengths */}
                            <div>
                              <h4 className="text-xs font-mono text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <CheckCircleIcon className="w-4 h-4 text-green-400" /> Strengths
                              </h4>
                              <ul className="space-y-1.5 text-xs text-gray-300">
                                {brand.strengths.map((str, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-green-400 font-bold mt-0.5">✓</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Weaknesses */}
                            <div>
                              <h4 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <XCircleIcon className="w-4 h-4 text-red-400" /> Weaknesses
                              </h4>
                              <ul className="space-y-1.5 text-xs text-gray-300">
                                {brand.weaknesses.map((weak, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-red-400 font-bold mt-0.5">✗</span>
                                    <span>{weak}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 3: COMPARISON TABLE */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'comparison' && (
              <div className="space-y-12">
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl overflow-hidden shadow-2xl">
                  {/* Table Header Section */}
                  <div className="p-6 border-b border-[#2E2E2E] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-mono text-[#00FF41] uppercase">Audit data matrix</span>
                      <h3 className="text-2xl font-bold text-white mt-1">Side-by-Side Comparison</h3>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">Comparing all 3 brands + target</span>
                  </div>

                  {/* Horizontal Scrollable container for tables */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#2E2E2E] bg-[#0A0A0A]/40 text-xs font-mono text-gray-400 uppercase">
                          <th className="py-4 px-6 font-semibold">Criteria</th>
                          <th className="py-4 px-6 font-semibold">Crystal Wellness</th>
                          <th className="py-4 px-6 font-semibold">EMF Shield Pro</th>
                          <th className="py-4 px-6 font-semibold">AyurVeda Natural</th>
                          <th className="py-4 px-6 font-semibold bg-[#00FF41]/5 text-[#00FF41] border-l border-r border-[#00FF41]/30">
                            Shungite Shield Target
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E2E2E]/60 text-sm">
                        {criteriaList.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#1A1A1A]/80 transition-colors">
                            <td className="py-3 px-6 font-medium text-gray-400 font-mono text-xs">{row.label}</td>
                            <td className="py-3 px-6 text-white">{row.cw}</td>
                            <td className="py-3 px-6 text-white">{row.ep}</td>
                            <td className="py-3 px-6 text-white">{row.av}</td>
                            <td className="py-3 px-6 bg-[#00FF41]/5 font-semibold text-[#00FF41] border-l border-r border-[#00FF41]/10">
                              {row.ss}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Graph Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left block: Chart Container */}
                  <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">Engagement Comparison</h4>
                      <p className="text-xs text-gray-500 font-mono mt-1 uppercase">Average Competitor Engagement vs. Shungite Shield Target</p>
                    </div>

                    <div className="h-64 mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" vertical={false} />
                          <XAxis
                            dataKey="name"
                            stroke="#6B7280"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#6B7280"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `${val}%`}
                          />
                          <Tooltip
                            cursor={{ fill: '#2E2E2E', opacity: 0.3 }}
                            contentStyle={{
                              backgroundColor: '#1A1A1A',
                              borderColor: '#2E2E2E',
                              borderRadius: '8px',
                              color: '#fff',
                              fontSize: '12px',
                              fontFamily: 'Inter, sans-serif'
                            }}
                            formatter={(value) => [`${value}%`, 'Engagement Rate']}
                          />
                          <Bar
                            dataKey="rate"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={45}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right block: Metric simulator (WOW Factor) */}
                  <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-xl flex flex-col justify-between glow-green-box transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#00FF41]" />
                        <h4 className="text-lg font-bold text-white">Target Metric Planner</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Simulate expected content performance based on strategy adjustments.</p>
                    </div>

                    <div className="space-y-4 my-6 text-xs">
                      {/* Control 1: Posts/Week */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-gray-400">POSTS PER WEEK</span>
                          <span className="text-[#00FF41]">{simPostsPerWeek}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={simPostsPerWeek}
                          onChange={(e) => setSimPostsPerWeek(parseInt(e.target.value))}
                          className="w-full accent-[#00FF41] bg-[#0A0A0A] h-1.5 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Control 2: EMF Content Ratio */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-gray-400">EMF EDUCATIONAL CONTENT %</span>
                          <span className="text-[#00FF41]">{simEmfPercentage}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={simEmfPercentage}
                          onChange={(e) => setSimEmfPercentage(parseInt(e.target.value))}
                          className="w-full accent-[#00FF41] bg-[#0A0A0A] h-1.5 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Control 3: B2B articles/week */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono">
                          <span className="text-gray-400">B2B LINKEDIN POSTS / WEEK</span>
                          <span className="text-[#00FF41]">{simB2BArticlesPerWeek}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          value={simB2BArticlesPerWeek}
                          onChange={(e) => setSimB2BArticlesPerWeek(parseInt(e.target.value))}
                          className="w-full accent-[#00FF41] bg-[#0A0A0A] h-1.5 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>

                      {/* Control 4: UGC Toggle */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-gray-400 font-mono">LAUNCH BRANDED UGC CAMPAIGN</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={simHasUgc}
                            onChange={(e) => setSimHasUgc(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-[#0A0A0A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00FF41]/20 peer-checked:after:bg-[#00FF41] peer-checked:after:border-[#00FF41]"></div>
                        </label>
                      </div>
                    </div>

                    {/* Simulation Results Display */}
                    <div className="bg-[#0A0A0A] border border-[#2E2E2E] p-3 rounded-lg grid grid-cols-2 gap-2 text-center font-mono">
                      <div className="border-r border-[#2E2E2E]">
                        <span className="text-[10px] text-gray-500 block">EST. ENGAGEMENT</span>
                        <span className="text-lg font-bold text-[#00FF41] mt-0.5 block">{simResults.engagement}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">OPPORTUNITY SCORE</span>
                        <span className="text-lg font-bold text-white mt-0.5 block">{simResults.opportunity}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* TAB 4: RECOMMENDATIONS */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'recommendations' && (
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-mono text-[#00FF41] uppercase">Actionable strategy</span>
                  <h3 className="text-2xl font-bold text-white mt-1">5 Strategic Recommendations for Shungite Shield</h3>
                  <p className="text-xs text-gray-500 font-mono uppercase mt-1">Based on competitor gap analysis — June 2026</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {recommendations.map(rec => (
                    <div
                      key={rec.rank}
                      className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-6 hover:border-gray-700 transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row gap-6 items-start"
                    >
                      {/* Priority Rank Indicator */}
                      <div className="bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20 font-bold font-mono h-12 w-12 rounded-xl flex items-center justify-center text-lg shrink-0 glow-green-box">
                        #{rec.rank}
                      </div>

                      <div className="space-y-3 flex-1">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          {rec.title}
                          {rec.rank === 1 && (
                            <span className="bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              CRITICAL PATH
                            </span>
                          )}
                        </h4>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs pt-1">
                          <div className="bg-[#0A0A0A]/40 border border-[#2E2E2E]/40 p-3 rounded-lg">
                            <span className="text-gray-500 font-mono block uppercase">Gap Analysis</span>
                            <p className="text-gray-300 mt-1.5 leading-relaxed">{rec.analysis}</p>
                          </div>
                          <div className="bg-[#0A0A0A]/40 border border-[#2E2E2E]/40 p-3 rounded-lg">
                            <span className="text-[#00FF41]/80 font-mono block uppercase">Action Plan</span>
                            <p className="text-gray-300 mt-1.5 leading-relaxed">{rec.action}</p>
                          </div>
                          <div className="bg-[#00FF41]/5 border border-[#00FF41]/15 p-3 rounded-lg">
                            <span className="text-[#00FF41] font-mono block uppercase">Expected Impact</span>
                            <p className="text-[#00FF41] mt-1.5 leading-relaxed font-semibold">{rec.expectedImpact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Opportunity Score Highlight Card */}
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-6 glow-green-box text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-[#00FF41]/5 to-transparent pointer-events-none"></div>
                  <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                    <span className="text-3xl">🎯</span>
                    <h3 className="text-xl font-bold text-white">Shungite Shield Content Opportunity Score: 8.5/10</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      The competitor landscape has significant gaps in EMF education, B2B content, and scientific-spiritual tone bridging. Shungite Shield is uniquely positioned to dominate all three areas simultaneously.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#1A1A1A] py-6 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 font-mono">
            <span>GO-BRICS Business Lab Content Audit Platform © June 2026. All rights reserved.</span>
            <div className="mt-1 text-gray-600">Confidential - Professional sign-off required for marketing lead review.</div>
          </div>
        </footer>
      </div>

      {/* ========================================================================= */}
      {/* PRINT-ONLY MIRROR LAYOUT (HIDDEN ON SCREEN, VISIBLE ON PRINT) */}
      {/* ========================================================================= */}
      <div className="hidden print:block bg-white text-black font-sans w-full leading-normal p-4">
        {/* Printable Header */}
        <div className="border-b-4 border-black pb-4 mb-6 flex justify-between items-end">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">GO-BRICS BUSINESS LAB MARKETING REPORT</div>
            <h1 className="print-heading-main mt-1">Competitor Content Audit Report</h1>
            <div className="print-heading-sub">TASK_C07 | Shungite Shield Wellness Brand Content Audit</div>
          </div>
          <div className="text-right text-xs font-mono text-slate-500">
            <div>TIMELINE: May–June 2026</div>
            <div>DATE: June 2026</div>
          </div>
        </div>

        {/* PRINT PAGE 1: OVERVIEW & STATS */}
        <div className="print-force-block space-y-6">
          <h2 className="print-section-title">01 / Executive Overview</h2>

          {/* Audit Details Box */}
          <div className="print-card-style">
            <h3 className="font-bold text-sm border-b border-slate-300 pb-1 mb-3 uppercase tracking-wide">Audit Metadata</h3>
            <table className="min-w-full text-xs">
              <tbody>
                <tr>
                  <td className="font-bold w-1/3 py-1 font-mono uppercase bg-slate-50 border-none">Brand Audited For:</td>
                  <td className="py-1 border-none">Shungite Shield</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 font-mono uppercase bg-slate-50 border-none">Competitors Analysed:</td>
                  <td className="py-1 border-none">3 Brands</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 font-mono uppercase bg-slate-50 border-none">Platforms Covered:</td>
                  <td className="py-1 border-none">Instagram, LinkedIn, Website</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 font-mono uppercase bg-slate-50 border-none">Audit Period:</td>
                  <td className="py-1 border-none">May–June 2026</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 font-mono uppercase bg-slate-50 border-none">Prepared By:</td>
                  <td className="py-1 border-none">GO-BRICS Business Lab Content Team</td>
                </tr>
                <tr>
                  <td className="font-bold py-1 font-mono uppercase bg-slate-50 border-none">Date:</td>
                  <td className="py-1 border-none">June 2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Intro Text */}
          <div className="print-card-style">
            <h3 className="font-bold text-sm border-b border-slate-300 pb-1 mb-2 uppercase tracking-wide">Report Introduction</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              This competitor content audit analyses the social media and website content strategy of three key competitors in the Indian wellness and EMF protection space. The audit covers content themes, posting frequency, best-performing post types, tone of voice, hashtag strategy, and estimated engagement rates for each brand. The findings are used to identify content gaps and opportunities for Shungite Shield to differentiate and outperform competitors in the Indian wellness market.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { title: "BRANDS AUDITED", val: "3" },
              { title: "POSTS ANALYSED", val: "180+" },
              { title: "AVG ENGAGEMENT", val: "3.2%" },
              { title: "OPPORTUNITY SCORE", val: "8.5 / 10" }
            ].map((st, i) => (
              <div key={i} className="border border-slate-400 p-3 text-center rounded">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">{st.title}</span>
                <span className="text-xl font-extrabold text-black mt-2 block">{st.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRINT PAGE 2: BRAND PROFILES */}
        <div className="print-force-block space-y-6">
          <h2 className="print-section-title">02 / Competitor Brand Profiles</h2>

          <div className="space-y-6">
            {competitors.map(brand => (
              <div key={brand.id} className="print-card-style">
                <div className="border-b border-slate-300 pb-1 mb-3 flex justify-between items-end">
                  <h3 className="font-extrabold text-sm uppercase text-slate-900">{brand.name}</h3>
                  <span className="text-xs font-mono font-bold text-slate-600">{brand.platform}</span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs mb-3">
                  <div>
                    <span className="font-bold text-slate-600 mr-1">Followers:</span>
                    <span>{brand.followers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-600 mr-1">Posts / Week:</span>
                    <span>{brand.avgPostsPerWeek}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-600 mr-1">Avg Engagement:</span>
                    <span>{brand.engagementRate}%</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-600 mr-1">Best Format:</span>
                    <span>{brand.bestPostType}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-slate-600 mr-1">Tone of Voice:</span>
                    <span>{brand.tone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-slate-600 mr-1">Content Themes:</span>
                    <span>{brand.themes.join(', ')}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-slate-600 mr-1">Hashtag Strategy:</span>
                    <span>{brand.hashtags}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-slate-600 mr-1">Website Content:</span>
                    <span>{brand.websiteContent}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-slate-600 mr-1">Posting Schedule:</span>
                    <span>{brand.postingTimes}</span>
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-3 text-[11px]">
                  <div>
                    <div className="font-bold text-emerald-800 uppercase tracking-wider mb-1">Strengths</div>
                    <ul className="space-y-0.5 list-disc pl-4 text-slate-700">
                      {brand.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-red-800 uppercase tracking-wider mb-1">Weaknesses</div>
                    <ul className="space-y-0.5 list-disc pl-4 text-slate-700">
                      {brand.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRINT PAGE 3: COMPARISON TABLE */}
        <div className="print-force-block space-y-6">
          <h2 className="print-section-title">03 / Side-by-Side Comparison</h2>

          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="py-2 px-3 border border-slate-400">Criteria</th>
                <th className="py-2 px-3 border border-slate-400">Crystal Wellness</th>
                <th className="py-2 px-3 border border-slate-400">EMF Shield Pro</th>
                <th className="py-2 px-3 border border-slate-400">AyurVeda Natural</th>
                <th className="py-2 px-3 border border-slate-400 bg-emerald-50 text-emerald-900">Shungite Shield Target</th>
              </tr>
            </thead>
            <tbody>
              {criteriaList.map((row, idx) => (
                <tr key={idx} className="text-slate-800">
                  <td className="py-2 px-3 border border-slate-300 bg-slate-50 font-bold">{row.label}</td>
                  <td className="py-2 px-3 border border-slate-300">{row.cw}</td>
                  <td className="py-2 px-3 border border-slate-300">{row.ep}</td>
                  <td className="py-2 px-3 border border-slate-300">{row.av}</td>
                  <td className="py-2 px-3 border border-slate-300 bg-emerald-50 text-emerald-900 font-bold">
                    {row.ss}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Simple Vector Bar Chart for Printing (replaces Recharts which doesn't print well natively) */}
          <div className="mt-8 border border-slate-300 p-4 rounded bg-slate-50">
            <h3 className="font-bold text-xs uppercase text-slate-800 tracking-wider mb-4 text-center">Engagement Comparison Index (%)</h3>
            <div className="space-y-4 max-w-md mx-auto">
              {[
                { name: "AyurVeda Natural Store", val: 2.4, color: "bg-slate-400" },
                { name: "Crystal Wellness India", val: 3.8, color: "bg-purple-400" },
                { name: "EMF Shield Pro", val: 4.2, color: "bg-blue-400" },
                { name: "Shungite Shield Target", val: 5.0, color: "bg-emerald-500 font-bold" }
              ].map((item, i) => (
                <div key={i} className="flex items-center text-xs">
                  <span className="w-1/2 font-mono text-slate-700">{item.name}</span>
                  <div className="w-1/2 flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 h-4 rounded overflow-hidden">
                      <div className={`${item.color} h-full`} style={{ width: `${item.val * 20}%` }}></div>
                    </div>
                    <span className="w-8 text-right font-bold font-mono">{item.val}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRINT PAGE 4: STRATEGIC RECOMMENDATIONS */}
        <div className="print-force-block space-y-6">
          <h2 className="print-section-title">04 / Strategic Recommendations</h2>

          <div className="space-y-4">
            {recommendations.map(rec => (
              <div key={rec.rank} className="border border-slate-300 p-4 rounded text-xs">
                <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
                  <h4 className="font-extrabold text-sm uppercase text-slate-900">
                    Recommendation #{rec.rank}: {rec.title}
                  </h4>
                  <span className="font-mono text-slate-500 uppercase tracking-widest font-bold">PRIORITY #{rec.rank}</span>
                </div>

                <div className="space-y-2 text-slate-700">
                  <div>
                    <span className="font-bold text-black uppercase text-[10px] block font-mono">Gap Context:</span>
                    <p className="mt-0.5 leading-relaxed">{rec.analysis}</p>
                  </div>
                  <div>
                    <span className="font-bold text-black uppercase text-[10px] block font-mono">Implementation Plan:</span>
                    <p className="mt-0.5 leading-relaxed">{rec.action}</p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800 uppercase text-[10px] block font-mono">Target Performance Impact:</span>
                    <p className="mt-0.5 leading-relaxed font-bold text-emerald-700">{rec.expectedImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Printable Opportunity Card */}
          <div className="border-2 border-black p-4 text-center rounded bg-slate-50 mt-6 page-break-inside-avoid">
            <span className="text-xl block">🎯</span>
            <h4 className="font-extrabold text-sm uppercase mt-2">Shungite Shield Opportunity Score: 8.5 / 10</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              The competitor landscape has significant gaps in EMF education, B2B content, and scientific-spiritual tone bridging. Shungite Shield is uniquely positioned to dominate all three areas simultaneously.
            </p>
          </div>
        </div>

        {/* Printable Sign-off */}
        <div className="border-t border-slate-300 pt-6 mt-12 grid grid-cols-2 gap-8 text-xs font-mono page-break-inside-avoid">
          <div>
            <div className="text-slate-500 uppercase mb-8">Prepared by</div>
            <div className="border-b border-slate-400 h-10 w-48 mb-2"></div>
            <div>GO-BRICS Content Team Lead</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase mb-8">Executive Sign-off</div>
            <div className="border-b border-slate-400 h-10 w-48 mb-2"></div>
            <div>Business Lab Operations Director</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
