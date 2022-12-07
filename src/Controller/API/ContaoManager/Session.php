<?php

namespace Oveleon\ProductInstaller\Controller\API\ContaoManager;

use Contao\System;
use Doctrine\DBAL\Exception;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Annotation\Route;

#[Route('%contao.backend.route_prefix%/contao_manager/session',
    name:       Session::class,
    defaults:   ['_scope' => 'backend', '_token_check' => false],
    methods:    ['POST']
)]
class Session
{
    /**
     * Authentication status codes
     */
    const STATUS_AUTHENTICATED = 200;
    const STATUS_NOT_AUTHENTICATED = 401;
    const STATUS_LOCKED = 403;
    const STATUS_NO_RECORDS = 204;

    public function __construct(
        private readonly ContaoManager $contaoManager,
        private readonly RouterInterface $router,
        private readonly RequestStack $requestStack
    ){}

    /**
     * @throws TransportExceptionInterface
     * @throws Exception
     */
    public function __invoke(): JsonResponse
    {
        $request = $this->requestStack->getCurrentRequest();
        $container = System::getContainer();

        // Create default response
        $response = [
            'manager' => [
                'path'       => $container->getParameter('contao_manager.manager_path'),
                'return_url' => $request->getSchemeAndHttpHost() . $this->router->generate(Authentication::class)
            ]
        ];

        // Get contao manager token
        $token = $this->contaoManager->getToken();

        if(null === $token)
        {
            return new JsonResponse([...$response, ...[
                'error' => true,
                'message' => 'Not authorized.'
            ]]);
        }

        // If we have access to the contao manager, get the status to check if the token is still active
        $status = $this->getStatus();

        switch ($status->getStatusCode())
        {
            case self::STATUS_AUTHENTICATED:
                $response['status'] = 'OK';
                break;

            case self::STATUS_LOCKED:
                $response['error'] = true;
                $response['message'] = 'The Contao Manager is locked.';
                break;

            case self::STATUS_NOT_AUTHENTICATED:
                $response['error'] = true;
                $response['message'] = 'Not authorized.';
                break;

            case self::STATUS_NO_RECORDS:
                $response['error'] = true;
                $response['message'] = 'No user records found.';
                break;
        }

        return new JsonResponse($response, $status->getStatusCode());
    }

    /**
     * Returns the current session status
     *
     * @throws TransportExceptionInterface
     * @throws Exception
     */
    private function getStatus(): ResponseInterface
    {
        return (HttpClient::create())->request(
            'GET',
            'http://contao413.local/contao-manager.phar.php/api/session',
            [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Contao-Manager-Auth' => $this->contaoManager->getToken()
                ]
            ]
        );
    }
}
