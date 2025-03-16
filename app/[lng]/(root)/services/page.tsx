import OrderForm from '@/components/forms/order-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function Page() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			{/* Xizmat haqida ma'lumot */}
			<Card className='p-6 bg-white shadow-md rounded-lg'>
				<CardContent>
					<h2 className='text-2xl font-poppins font-bold mb-4'>
						🏠 Uy Tozalash Xizmati – Sifat va Ishonch
					</h2>
					<p className='text-gray-700'>
						Toza va ozoda uy – har bir inson uchun qulaylik va xotirjamlik
						manbai. Ammo doimiy ravishda tozalikni saqlash va uy ishlariga vaqt
						topish har doim ham oson emas. Bizning kompaniyamiz sizning
						qulayligingiz uchun professional uy tozalash xizmatlarini taklif
						qiladi. Biz tozalash xizmatlari bo‘yicha ishonchli va tajribali
						kompaniyamiz. Maqsadimiz – mijozlarimizga qulay va sifatli xizmat
						ko‘rsatish. Biz uy va ofis tozalash xizmatlari bo‘yicha yetakchi
						kompaniyalardan birimiz. Tajribali mutaxassislarimiz yordamida
						mijozlarimizga eng yuqori sifatli xizmatni taqdim etamiz. Bizning
						maqsadimiz – sizning uyingiz yoki ish joyingizni har doim ozoda va
						gigiyenik toza saqlashdir.
					</p>

					<ul className='mt-5 space-y-2'>
						<h1 className='font-poppins font-bold'>Bizning Xizmatlar:</h1>
						<li>
							✅ Umumiy tozalash – Uy yoki ofisingizni boshdan-oyoq tozalash
						</li>
						<li>
							✅ Oshxona va vannaxona gigiyenasi – Dog‘ va yog‘larni tozalash,
							dezinfeksiya
						</li>
						<li>
							✅ Oynalar va eshiklarni artish – Shaffof va yorug‘likni yaxshi
							o‘tkazadigan oynalar
						</li>
						<li>
							✅ Gilam va mebellarni tozalash – Chang, dog‘ va bakteriyalardan
							himoya qilish
						</li>
						<li>
							✅ Ofis va tijorat obyektlarini tozalash – Ish joyingiz doimo toza
							va tartibli bo‘lishi uchun
						</li>
					</ul>

					<p className='mt-4'></p>

					<Button className='mt-4 w-full' variant='ghost'>
						Batafsil ma'lumot
					</Button>
				</CardContent>
			</Card>

			<OrderForm />
		</div>
	)
}

export default Page
