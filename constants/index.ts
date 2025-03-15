import {
	CheckCircle,
	CircleHelp,
	DollarSign,
	Heart,
	Home,
	Phone,
	Shield,
	Sparkles,
	ThumbsUp,
} from 'lucide-react'

export const navLinks = [
	{ route: '', name: 'navLink1', icon: Home },
	{ route: 'service', name: 'navLink2', icon: Sparkles },
	{ route: 'price', name: 'navLink3', icon: DollarSign },
	{ route: 'contacts', name: 'navLink4', icon: Phone },
	{ route: 'help', name: 'navLink5', icon: CircleHelp },
]

export const lngs = [
	{ route: 'uz', label: "O'zb" },
	{ route: 'ru', label: 'Рус' },
]

export const features = [
	{ icon: CheckCircle, title: 'strictSelection', text: 'strictTitle' },
	{ icon: ThumbsUp, title: 'qualityAssurance', text: 'qualityTitle' },
	{ icon: Heart, title: 'selectedCleaner', text: 'selectedTitle' },
	{ icon: Shield, title: 'Reliability', text: 'ReliabilityTitle' },
]
