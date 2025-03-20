import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

function Page() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			<Card className='p-6 bg-white shadow-md rounded-lg'>
				<CardContent>
					<h2 className='text-2xl font-poppins font-bold mb-4'>
						🏡 Uy tozalash xizmati
					</h2>
					<p className='text-gray-700'>
						Uy – bu sizning shaxsiy hududingiz, qulaylik va toza muhit esa
						sog‘liq va kayfiyatga ta’sir qiladi. Bizning professional uy
						tozalash xizmati sizga quyidagilarni taklif qiladi:
					</p>

					<ul className='mt-5 space-y-2'>
						<li>✔️ Xonalarni tozalash va changdan xalos qilish</li>
						<li>✔️ Mebellarni artish va parvarish qilish</li>
						<li>✔️ Oynalar va eshiklarni tozalash</li>
						<li>✔️ Gilam va pollarni yuvish</li>
						<li>✔️ Oshxona va hojatxona tozaligi</li>
					</ul>

					<p className='mt-4'>
						Ertaga emas, bugun uyingizni yangilashni boshlang! 🏡✨
					</p>
					<Link href={'/services/order-form'}>
						<Button className='mt-4'>Buyurtma berish</Button>
					</Link>
				</CardContent>
			</Card>

			<Card className='p-6 bg-white shadow-md rounded-lg'>
				<CardContent>
					<h2 className='text-2xl font-poppins font-bold mb-4'>
						🏢 Ofis tozalash xizmati
					</h2>
					<p className='text-gray-700'>
						Toza ofis – bu muvaffaqiyatli biznes va samarali ish muhiti! Biz
						sizning kompaniyangiz uchun ofis tozalash xizmatini taklif qilamiz:
					</p>

					<ul className='mt-5 space-y-2'>
						<li>✔️ Ish joylarini tartibga keltirish</li>
						<li>✔️ Mebel va texnikalarni artish</li>
						<li>✔️ Oynalar va eshiklarni tozalash</li>
						<li>✔️ Pol va gilamlarni maxsus vositalar bilan yuvish</li>
						<li>✔️ Hammom va oshxonani gigiyenik tozalash</li>
					</ul>

					<p className='mt-4'>💼 Biznesingiz tozalikdan boshlansin! 🚀✨</p>

					<Button className='mt-4'>Buyurtma berish</Button>
				</CardContent>
			</Card>
		</div>
	)
}

export default Page
