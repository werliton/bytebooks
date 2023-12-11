import PageSection from '../../components/PageSection';

const Order = () => {
	const isLoading = true;
	return (
		<>
			<PageSection>
				<h1 className='text-2xl md:text-4xl text-white font-bold my-5'>Finalizar compra</h1>
			</PageSection>
			<div className='mt-20 w-full items-center justify-center flex'>
				{isLoading ? (
					<img src='/loading.gif' alt='carregando' width={200} />
				) : (
					<img src='/pedido_confirmado.webp' alt='pedido confirmado' />
				)}
			</div>
		</>
	);
};

export default Order;
